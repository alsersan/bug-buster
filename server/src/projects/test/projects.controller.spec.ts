import { Test, TestingModule } from '@nestjs/testing';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { ProjectsController } from '../projects.controller';
import { ProjectsService } from '../projects.service';

describe('Given the ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  const mockProject = {
    _id: '1',
    name: 'test',
    description: 'test',
    status: 'active',
    dateCreated: 'today',
    dateClosed: null,
    tickets: [],
    members: {},
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: {
            createProject: jest.fn().mockResolvedValue(mockProject),
            getAllProjects: jest.fn().mockResolvedValue([mockProject]),
            getProjectById: jest.fn().mockResolvedValue(mockProject),
            updateProject: jest.fn().mockResolvedValue(mockProject),
            deleteProject: jest
              .fn()
              .mockResolvedValue({ deletedProjectId: mockProject._id }),
          },
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  describe('when it is instantiated', () => {
    test('then it should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('when create is called', () => {
    test('then ProjectsService.createProject should be called with a new project', async () => {
      const newProject = new CreateProjectDto();
      await controller.create(newProject);
      expect(service.createProject).toHaveBeenCalledWith(newProject);
    });
    test('then it should return a new project', async () => {
      const newProject = await controller.create(new CreateProjectDto());
      expect(newProject).toEqual(mockProject);
    });
  });

  describe('when findAll is called', () => {
    test('then ProjectsService.getAllProjects should be called', async () => {
      await controller.findAll();
      expect(service.getAllProjects).toHaveBeenCalled();
    });
    test('then it should return all projects', async () => {
      const projects = await controller.findAll();
      expect(projects[0]).toEqual(mockProject);
    });
  });

  describe('when findOne is called', () => {
    test('then ProjectsService.getProjectById should be called with a project id', async () => {
      await controller.findOne(mockProject._id);
      expect(service.getProjectById).toHaveBeenCalledWith(mockProject._id);
    });
    test('then it should return one project', async () => {
      const project = await controller.findOne(mockProject._id);
      expect(project).toEqual(mockProject);
    });
  });

  describe('when update is called', () => {
    test('then ProjectsService.updateProject should be called with a project id and update object', async () => {
      const projectUpdate = new UpdateProjectDto();
      await controller.update(mockProject._id, projectUpdate);
      expect(service.updateProject).toHaveBeenCalledWith(
        mockProject._id,
        projectUpdate,
      );
    });
    test('then it should return the modified project', async () => {
      const project = await controller.update(
        mockProject._id,
        new UpdateProjectDto(),
      );
      expect(project).toEqual(mockProject);
    });
  });

  describe('when delete is called', () => {
    test('then ProjectsService.deleteProject should be called with a project id', async () => {
      await controller.delete(mockProject._id);
      expect(service.deleteProject).toHaveBeenCalledWith(mockProject._id);
    });
    test('then it should return a message', async () => {
      const message = await controller.delete(mockProject._id);
      expect(message).toEqual({ deletedProjectId: mockProject._id });
    });
  });
});
