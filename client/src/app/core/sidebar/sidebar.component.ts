import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sections: string[] = ['dashboard', 'projects', 'users', 'profile'];
  constructor() {}

  ngOnInit(): void {}
}
