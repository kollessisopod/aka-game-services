import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotfoundRoutingModule } from './notfound-routing.module';
import { NotfoundComponent } from './pages/notfound/notfound.component';

import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    NotfoundRoutingModule,
    NzResultModule,
    NzButtonModule
  ]
})
export class NotfoundModule { }
