import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [HeaderComponent, LayoutComponent, SidebarComponent],
  imports: [CommonModule],
  exports: [LayoutComponent],
})
export class CoreModule {}
