import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AKA Team';
  showFileExplorer = false;

  toggleFileExplorer() {
    this.showFileExplorer = !this.showFileExplorer;
  }
}