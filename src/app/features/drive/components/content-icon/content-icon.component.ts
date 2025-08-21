import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-icon',
  templateUrl: './content-icon.component.html',
  styleUrl: './content-icon.component.scss'
})
export class ContentIconComponent {
  @Input({ required: true }) contentType!: string;

}
