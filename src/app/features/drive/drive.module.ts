import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriveRoutingModule } from './drive-routing.module';
import { DriveComponent } from './pages/drive/drive.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ContentIconComponent } from './components/content-icon/content-icon.component';


@NgModule({
  declarations: [
    DriveComponent,
    GridViewComponent,
    ListViewComponent,
    ContentIconComponent
  ],
  imports: [
    CommonModule,
    DriveRoutingModule
  ]
})
export class DriveModule { }
