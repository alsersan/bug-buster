import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { getAllUsers } from 'src/app/store/users/users.actions';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit, OnDestroy {
  @Input() project!: Project;
  @Output() isVisible = new EventEmitter<boolean>();
  editProject!: FormGroup;

  managers: Array<any> = [];
  developers: Array<any> = [];
  qualityAssuranceMembers: Array<any> = [];
  statusOptions: Array<any> = [];

  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsSingleSelect: IDropdownSettings = {};

  selectedItems: Array<any> = [];

  subscription: Subscription = this.store.select('users').subscribe((users) => {
    users.forEach((user) => {
      const userObject = {
        item_id: user._id as string,
        item_text: `${user.name} ${user.surname} - ${user.seniority}`,
      };
      if (user.role === 'project-manager') {
        this.managers.push(userObject);
      }
      if (user.role === 'developer') {
        this.developers.push(userObject);
      }
      if (user.role === 'quality-assurance') {
        this.qualityAssuranceMembers.push(userObject);
      }
    });

    this.initializeForm();
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<{ users: User[] }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAllUsers());

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
  }

  initializeForm() {
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

    this.editProject = this.fb.group({
      status: ['', Validators.required],
      manager: ['', Validators.required],
      developers: [''],
      qualityAssurance: [''],
    });
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
        status: formResult.status[0],
        members: {
          projectManager: formResult.manager[0].item_id,
          developers: developersArray,
          qualityAssurance: qualityArray,
        },
      };
      console.log(updatedProject);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
