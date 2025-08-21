import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataResult } from '../data-result';
import { FileDTO } from '../file-dto';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Breadcrumb } from '../core/models/breadcrumb.model';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import { AccessType } from '../core/models/access-type.enum';
import { environment } from '../../environments/environment';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  
  //New
  employees: any[] = []; // Gelen veriler için bir dizi
  players: any[] = [];
  feedbacks: any[] = [];

  isEmployeeModalVisible = false;
  isPlayerModalVisible = false;
  constructor(private http: HttpClient, private router: Router) { }

  async ngOnInit() {
    await this.fetchFeedbacks().then(() => {

    });
  }

  async fetchEmployees() {
    this.http
      .get('https://localhost:7029/Employee/GetEmployees', {})
      .subscribe(
        (response: any) => {
          console.log('HTTP Response:', response);
          this.employees = response;
          this.isEmployeeModalVisible = true;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  async fetchPlayers() {
    this.http
      .get('https://localhost:7029/Employee/GetPlayers', {})
      .subscribe(
        (response: any) => {
          console.log('HTTP Response:', response);
          this.players = response;
          this.isPlayerModalVisible = true;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  async fetchFeedbacks(){
    this.http
    .get('https://localhost:7029/Employee/GetFeedbacks', {})
    .subscribe(
      (response: any) => {
        console.log('HTTP Response:', response);
        this.feedbacks = response;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  async makeReport(){ //TODO
    this.http
    .get('https://localhost:7029/Employee/GetFeedbacks', {})
    .subscribe(
      (response: any) => {
        console.log('HTTP Response:', response);
        alert("Report successfully sent to the Marketing Team.")
        
      },
      (error) => {
        alert("Report creation failed.")
        console.error('Error:', error);
      }
    );
  }

  logout() {
    this.router.navigate(['/login'])
  }

  closeEmployeeModal() {
    this.isEmployeeModalVisible = false;
  }

  closePlayerModal() {
    this.isPlayerModalVisible = false;
  }
  getAccessTypeLabel(accessType: number): string {
    switch (accessType) {
      case 0:
        return 'Read Only';
      case 1:
        return 'Writer';
      case 2:
        return 'Admin';
      default:
        return 'Unknown';
    }
  }

  calculateFileSize(size: number): string {
    if (size < 1024) {
      return size.toString() + ' B';
    }
    else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + ' KB';
    }
    else if (size < 1024 * 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(2) + ' MB';
    }
    else {
      return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
  }
}
