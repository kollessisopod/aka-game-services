import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  Username: string = '';
  Password: string = '';
  role: string = '';  // Player veya Employee
  employeeId: number | null = null;  // Employee için ID

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  onLogin() {
    // FormData nesnesini oluşturun
    const formData = new FormData();
    
    // Role göre verileri hazırlayın
    if (this.role === 'Player') {
      // Player için verileri ekleyin
      formData.append('username', this.Username);
    } else if (this.role === 'Employee') {
      // Employee için ID kullanacağız
      formData.append('id', this.employeeId!.toString());
    }
  
    formData.append('password', this.Password); // Şifre her iki durumda da eklenir.
  
    console.log(formData);
    console.log(this.Username);
    console.log(this.Password);
  
    // Rol kontrolü yaparak doğru URL'yi seç
    const loginUrl = this.role === 'Player' 
      ? `${environment.baseUrlMaster}/Player/PlayerLogin` 
      : `${environment.baseUrlMaster}/Employee/EmployeeLogin`;
  
    this.http.post<any>(loginUrl, formData).subscribe({
      next: response => {
        if (response) {
          // Giriş başarılı ise kullanıcı bilgilerini kaydedin
          this.authService.setUser(response.Username || response.name); // Player için Username, Employee için name
          this.authService.setId(response.id);
          console.log(response);
          // Employee için type kontrolü yapalım
          if (this.role === 'Employee') {
            if (response.userType === true) {  // Eğer e_type TRUE ise
              this.router.navigate(['/employee']);
            } else {  // Eğer e_type FALSE ise
              this.router.navigate(['/files']);
            }
          } else {
            this.router.navigate(['/customer']); // Player ise /customer'a yönlendirilir.
          }
        } else {
          alert(response || 'Login failed');
        }
      },
      error: error => {
        // Hata durumu
        console.error(error);
        alert('Login failed');
      }
    });
  }
  

  onWorkerLogin() {
    this.router.navigate(['/files']);
  }

  onLogin1() {
  // FormData nesnesi oluşturuluyor
  const formData = new FormData();
  
  // Form verilerini ekliyoruz
  formData.append('username', this.Username);
  formData.append('password', this.Password);
    this.http.post<any>('https://localhost:7029/Player/PlayerLogin', formData)
      .subscribe({
        next: response => {
          console.log(response);
          if (response.isSuccess) {
            const token = response.data;
            localStorage.setItem('token', token);
            this.router.navigate(['/files']);
          } else {
            alert(response.message || 'Login failed');
          }
        },
        error: error => {
          // Hata durumu
          console.error(error);
          alert('Login failed');
        },
        complete: () => {
          // Tamamlanma durumu (Opsiyonel)
        }
      });
  }

}
