import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { getAllUsers } from 'src/app/store/users/users.actions';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { updateProject } from 'src/app/store/projects/projects.actions';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
  @Input() project!: Project;
  @Output() isVisible = new EventEmitter<boolean>();
  editProject!: FormGroup;

  managers: Array<any> = [];
  developers: Array<any> = [];
  qualityAssuranceMembers: Array<any> = [];
  statusOptions: Array<any> = [];

  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsSingleSelect: IDropdownSettings = {};

  selectedStatus: Array<any> = [];
  selectedManager: Array<any> = [];
  selectedDevelopers: Array<any> = [];
  selectedQualityAssurance: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<{ users: User[] }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAllUsers());

    console.log('onInit', this.project);

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
    };
    this.dropdownSettingsSingleSelect = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll: false,
    };

    this.editProject = this.fb.group({
      status: [''],
      manager: ['', Validators.required],
      developers: [''],
      qualityAssurance: [''],
    });

    this.store.select('users').subscribe((users) => {
      users.forEach((user) => {
        const userObject = {
          item_id: user._id as string,
          item_text: `${user.name} ${user.surname} - ${user.seniority}`,
        };
        if (user.role === 'project-manager') {
          this.managers.push(userObject);
          if (this.project.members.projectManager._id === user._id) {
            this.selectedManager.push(userObject);
          }
        }
        if (user.role === 'developer') {
          this.developers.push(userObject);
        }
        if (user.role === 'quality-assurance') {
          this.qualityAssuranceMembers.push(userObject);
          if (this.project.members.projectManager._id === user._id) {
            this.selectedManager.push(userObject);
          }
        }
      });
      this.statusOptions = [
        {
          item_id: 'active',
          item_text: 'Active',
        },
        {
          item_id: 'closed',
          item_text: 'Closed',
        },
      ];
      this.selectedStatus = [
        {
          item_id: this.project.status,
          item_text: this.project.status,
        },
      ];
      this.selectedDevelopers = this.project.members.developers?.map((el) => ({
        item_id: el._id as string,
        item_text: `${el.name} ${el.surname} - ${el.seniority}`,
      }))!;
      this.selectedQualityAssurance =
        this.project.members.qualityAssurance?.map((el) => ({
          item_id: el._id as string,
          item_text: `${el.name} ${el.surname} - ${el.seniority}`,
        }))!;
      this.editProject.controls['status'].setValue(this.selectedStatus);
      this.editProject.controls['manager'].setValue(this.selectedManager);
      this.editProject.controls['developers'].setValue(this.selectedDevelopers);
      this.editProject.controls['qualityAssurance'].setValue(
        this.selectedQualityAssurance
      );
    });
  }

  initializeForm() {
    /* this.selectedManager = [
      {
        item_id: 'active',
        item_text: 'Active',
      },
    ]; */
    /* this.editProject = this.fb.group({
      status: [this.selectedItems],
      manager: ['', Validators.required],
      developers: [''],
      qualityAssurance: [''],
    }); */
    /* this.editProject = this.fb.group({
      status: ['active', Validators.required],
      manager: [this.managers[0], Validators.required],
      developers: [''],
      qualityAssurance: [''],
    }); */
  }

  onCancel() {
    this.isVisible.emit(false);
  }

  onSubmit() {
    if (this.editProject.valid) {
      const formResult = this.editProject.value;
      let developersArray = [];
      if (formResult.developers.length) {
        developersArray = formResult.developers.map((el: any) => el.item_id);
      }
      let qualityArray = [];
      if (formResult.qualityAssurance.length) {
        qualityArray = formResult.qualityAssurance.map((el: any) => el.item_id);
      }

      const updatedProject = {
        status: formResult.status[0].item_id,
        members: {
          projectManager: formResult.manager[0].item_id,
          developers: developersArray,
          qualityAssurance: qualityArray,
        },
      };
      this.store.dispatch(
        updateProject({ projectId: this.project._id!, update: updatedProject })
      );
      this.isVisible.emit(false);
    }
  }
}
