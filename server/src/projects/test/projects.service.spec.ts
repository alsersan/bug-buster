import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { addItemToList, removeItemFromList } from 'src/utils/add-remove-items';
import { CreateProjectDto } from '../dto/create-project.dto';
import { ProjectsService } from '../projects.service';
import { Project } from '../schemas/project.schema';

describe('Given the ProjectsService', () => {
  let service: ProjectsService;
  let model: Model<Project>;

  const mockProject = {
    _id: '1',
    name: 'test',
    description: 'test',
    status: 'test',
    dateCreated: 'today',
    dateClosed: null,
    tickets: [],
    members: {
      projectManager: 'Joe',
      developers: [],
      qualityAssurance: [],
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getModelToken('Project'),
          useValue: {
            create: jest.fn().mockResolvedValue(mockProject),
            find: jest.fn().mockResolvedValue([mockProject]),
            findById: jest.fn().mockResolvedValue(mockProject),
            findByIdAndUpdate: jest.fn().mockResolvedValue(mockProject),
            findByIdAndDelete: jest.fn().mockResolvedValue(mockProject),
          },
        },
        {
          provide: getModelToken('User'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    model = module.get<Model<Project>>(getModelToken('Project'));

    service.processQuery = jest.fn((param) => param);
    const addItem = jest.fn();
    (addItemToList as jest.Mock) = addItem;
    const removeItem = jest.fn();
    (removeItemFromList as jest.Mock) = removeItem;
  });

  describe('when it is instantiated', () => {
    test('then it should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('when createUser is called', () => {
    let project;
    beforeEach(async () => {
      project = await service.createProject(
        mockProject as unknown as CreateProjectDto,
      );
    });
    test('then model.create should be called with new project', () => {
      expect(model.create).toHaveBeenCalledWith(mockProject);
    });
    test('then model.findById should be called with id of new project', () => {
      expect(model.findById).toHaveBeenCalledWith(mockProject._id);
    });
    test('then it should return the new project', () => {
      expect(project).toEqual(mockProject);
    });
    test('then addItemToList should be called', () => {
      expect(addItemToList).toHaveBeenCalled();
    });
    test('then processQuery should be called', () => {
      expect(service.processQuery).toHaveBeenCalled();
    });
  });

  describe('when getAllProjects is called', () => {
    let projects;
    beforeEach(async () => {
      projects = await service.getAllProjects();
    });
    test('then model.find should be called', () => {
      expect(model.find).toHaveBeenCalled();
    });
    test('then it should return all projects', () => {
      expect(projects).toEqual([mockProject]);
    });
    test('then processQuery should be called', () => {
      expect(service.processQuery).toHaveBeenCalled();
    });
  });

  describe('When getProjectById is called', () => {
    let project;
    beforeEach(async () => {
      project = await service.getProjectById(mockProject._id);
    });
    test('then model.findById should be called with the project id', () => {
      expect(model.findById).toHaveBeenCalledWith(mockProject._id);
    });
    test('then it should return one project', () => {
      expect(project).toEqual(mockProject);
    });
    test('then processQuery should be called', () => {
      expect(service.processQuery).toHaveBeenCalled();
    });
  });
});
