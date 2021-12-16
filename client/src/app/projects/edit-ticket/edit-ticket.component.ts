import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { getAllUsers } from 'src/app/store/users/users.actions';
import { capitalize } from 'src/app/utils/capitalize';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss'],
})
export class EditTicketComponent implements OnInit {
  @Input() ticket!: Ticket;
  @Output() isVisible = new EventEmitter<boolean>();

  editTicket!: FormGroup;

  status: Array<any> = [];
  priority: Array<any> = [];
  developers: Array<any> = [];

  selectedStatus: Array<any> = [];
  selectedPriority: Array<any> = [];
  selectedDevelopers: Array<any> = [];

  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsSingleSelect: IDropdownSettings = {};

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
    this.editTicket = this.fb.group({
      status: ['', Validators.required],
      priority: ['', Validators.required],
      assignedTo: [''],
    });

    this.store.select('users').subscribe((users) => {
      users.forEach((user) => {
        const userObject = {
          item_id: user._id as string,
          item_text: `${user.name} ${user.surname} - ${user.seniority}`,
        };
        if (user.role === 'developer') {
          this.developers.push(userObject);
        }
      });
      this.status = [
        {
          item_id: 'active',
          item_text: 'Active',
        },
        {
          item_id: 'pending',
          item_text: 'Pending',
        },
        {
          item_id: 'closed',
          item_text: 'Closed',
        },
      ];

      this.priority = [
        {
          item_id: 'low',
          item_text: 'Low',
        },
        {
          item_id: 'medium',
          item_text: 'Medium',
        },
        {
          item_id: 'high',
          item_text: 'High',
        },
        {
          item_id: 'immediate',
          item_text: 'Immediate',
        },
      ];
      this.selectedStatus = [
        {
          item_id: this.ticket.status,
          item_text: capitalize(this.ticket.status),
        },
      ];
      this.selectedPriority = [
        {
          item_id: this.ticket.priority,
          item_text: capitalize(this.ticket.priority),
        },
      ];
      this.editTicket.controls['status'].setValue(this.selectedStatus);
      this.editTicket.controls['priority'].setValue(this.selectedPriority);
      this.selectedDevelopers = this.ticket.assignedTo.map((el) => ({
        item_id: el._id as string,
        item_text: `${el.name} ${el.surname} - ${el.seniority}`,
      }))!;

      this.editTicket.controls['assignedTo'].setValue(this.selectedDevelopers);
    });
  }

  onSubmit() {
    if (this.editTicket.valid) {
      const formResult = this.editTicket.value;
      console.log(formResult);
      let developersArray = [];
      if (formResult.assignedTo.length) {
        developersArray = formResult.assignedTo.map((el: any) => el.item_id);
      }
      const updatedTicket = {
        status: formResult.status[0].item_id,
        priority: formResult.priority[0].item_id,
        assignedTo: developersArray,
      };
      console.log(updatedTicket);
    }
  }

  onCancel() {
    this.isVisible.emit(false);
  }
}
