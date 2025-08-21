import { Component } from '@angular/core';
import { File } from '../../models/file.model';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.scss'
})
export class GridViewComponent {

  files:File[]=[];
}
