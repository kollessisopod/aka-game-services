import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private apiUrl = 'http://localhost:7221/Storage'; // API URL'nizi buraya ekleyin

    constructor(private http: HttpClient) { }

    getFilesAndFolders(path: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/GetUserFiles`);
    }

    uploadFile(file: File, path: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.apiUrl}/UploadFile`, formData);
    }

    downloadFile(fileName: string, path: string): Observable<Blob> {
        return this.http.get(`${this.apiUrl}/DownloadFile?path=${path}&fileName=${fileName}`, { responseType: 'blob' });
    }
}
