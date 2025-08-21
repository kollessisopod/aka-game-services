import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriveComponent } from './pages/drive/drive.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'00000000-0000-0000-0000-000000000000'},
  {path:':folderId', component:DriveComponent},
  {path:':folderId/:fileId', component:DriveComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriveRoutingModule { }
