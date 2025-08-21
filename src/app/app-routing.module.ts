import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FileListComponent } from './file-list/file-list.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'files', component: FileListComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'home', component: HomeComponent },  // Varsayılan bileşen
  { path: '**', redirectTo: '/login' }  // Tanımlanmamış yolları yönlendirme
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
