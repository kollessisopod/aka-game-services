import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h3>Home of the Website</h3>
  `,
  styles: [
    `
      h1 {
        color: #333;
        font-family: Arial, sans-serif;
      }
      input {
        display: block;
        margin: 10px 0;
        padding: 8px;
        width: 100%;
        max-width: 300px;
      }
    `
  ],
})
export class HomeComponent { }
