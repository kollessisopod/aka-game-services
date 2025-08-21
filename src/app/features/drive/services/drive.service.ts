import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { File } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  constructor(private apiService:ApiService) {
    
   }

   getFiles(){
    console.log(this.apiService.get("https://localhost:7221/Storage/GetFiles?showDeleted=false"));
    
   }
}
