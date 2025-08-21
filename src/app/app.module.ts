import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // FormsModule ve ReactiveFormsModule eklendi
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './core/layouts/defaultLayout';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { FileListComponent } from './file-list/file-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DefaultLayoutComponent,
    LoginComponent,
    EmployeeComponent,
    FileListComponent,
    CustomerComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, // FormsModule'ü eklediniz
    ReactiveFormsModule, // Eğer Reactive Forms kullanıyorsanız ekleyin
    AppRoutingModule,
    RouterModule.forRoot([]), // RouterModule burada
    CommonModule,
    NgxDropzoneModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
