import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProjectsService } from './projects.service';

const mockProject = {
  name: 'testProject',
};
const url = 'http://localhost:3000/projects';

describe('Given ProjectsService', () => {
  let service: ProjectsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProjectsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('when it is instantiated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('when createProject is called', () => {
    it('it should return a new project', () => {
      service
        .createProject({
          name: '',
          description: '',
          dateCreated: new Date(),
          members: {
            projectManager: '',
          },
        })
        .subscribe((data) => {
          expect(JSON.stringify(data)).toEqual(JSON.stringify(mockProject));
        });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: url,
      });

      expect(req.request.url).toBe(url);

      req.flush(mockProject);
    });
  });

  describe('when getAllProjects is called', () => {
    it('it should return all the projects', () => {
      service.getAllProjects().subscribe((data) => {
        expect(JSON.stringify(data)).toEqual(JSON.stringify([mockProject]));
      });

      const req = httpTestingController.expectOne({
        method: 'GET',
        url: url,
      });

      expect(req.request.url).toBe(url);

      req.flush([mockProject]);
    });
  });

  describe('when getProjectById is called', () => {
    it('it should one project', () => {
      const projectId = '1';
      service.getProjectById(projectId).subscribe((data) => {
        expect(JSON.stringify(data)).toEqual(JSON.stringify(mockProject));
      });

      const req = httpTestingController.expectOne({
        method: 'GET',
        url: `${url}/${projectId}`,
      });

      expect(req.request.url).toBe(`${url}/${projectId}`);

      req.flush(mockProject);
    });
  });

  describe('when updateProject is called', () => {
    it('it should return the updated project', () => {
      const projectId = '1';
      service.updateProject(projectId, { name: '' }).subscribe((data) => {
        expect(JSON.stringify(data)).toEqual(JSON.stringify(mockProject));
      });

      const req = httpTestingController.expectOne({
        method: 'PATCH',
        url: `${url}/${projectId}`,
      });

      expect(req.request.url).toBe(`${url}/${projectId}`);

      req.flush(mockProject);
    });
  });

  describe('when deleteProject is called', () => {
    it('it should return a delete message', () => {
      const projectId = '1';
      const deleteMsg = { deletedProjectId: projectId };
      service.deleteProject(projectId).subscribe((data) => {
        expect(JSON.stringify(data)).toEqual(JSON.stringify(deleteMsg));
      });

      const req = httpTestingController.expectOne({
        method: 'DELETE',
        url: `${url}/${projectId}`,
      });

      expect(req.request.url).toBe(`${url}/${projectId}`);

      req.flush(deleteMsg);
    });
  });
});
