import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriveService } from '../../services/drive.service';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrl: './drive.component.scss'
})
export class DriveComponent {

  id:string;
  constructor(private route: ActivatedRoute, private driveService:DriveService) {
    this.id=route.snapshot.params["folderId"];
    this.driveService.getFiles();
  }
  
}
