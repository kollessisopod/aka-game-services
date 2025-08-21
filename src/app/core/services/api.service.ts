import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  get(url: string): any {
    this.http.get(url).subscribe((data: any) => {
      return data
    });

  }

  post(url:string, body:any):any{
    this.http.post(url,body).subscribe((data:any)=>{
      console.log(data);
      
      return data;
    });
  }

}
