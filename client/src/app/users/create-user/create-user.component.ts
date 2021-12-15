import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { NewUser } from 'src/app/models/user.model';
import { UploadService } from 'src/app/services/users/upload.service';
import { UsersService } from 'src/app/services/users/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  createUser!: FormGroup;
  roles = [
    { name: 'Administrator', value: 'admin' },
    { name: 'Project Manager', value: 'project-manager' },
    { name: 'Developer', value: 'developer' },
    { name: 'Quality Assurance', value: 'quality-assurance' },
  ];
  seniorities = ['trainee', 'junior', 'middle', 'senior'];

  constructor(
    private uploadService: UploadService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createUser = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
        seniority: new FormControl('', Validators.required),
        avatar: new FormControl('', Validators.required),
      },
      { updateOn: 'blur' }
    );
  }

  onSubmit() {
    if (this.createUser.valid) {
      const fileData = document.forms[0]['user-avatar'].files[0];
      const data = new FormData();
      data.append('file', fileData);
      data.append('upload_preset', environment.uploadPreset);
      data.append('cloud_name', environment.cloudName);
      this.uploadService.uploadImage(data).subscribe((res) => {
        const formResult = this.createUser.value;
        const user: NewUser = {
          name: formResult.name,
          surname: formResult.surname,
          email: formResult.email,
          password: formResult.password,
          role: formResult.role,
          seniority: formResult.seniority,
          avatarUrl: res.url,
        };
        this.usersService.createUser(user).subscribe({
          next: (res) => {
            this.createUser.reset();
            this.router.navigateByUrl('/users');
          },
          error: (err) => console.log('ERR', err),
        });
      });
    }
  }
}
