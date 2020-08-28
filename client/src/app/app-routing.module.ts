import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { DepartmentDetailsComponent } from './components/department/department-details/department-details.component';
import { DepartmentListComponent } from './components/department/department-list/department-list.component';
import { CompanyDetailsComponent } from './components/company/company-details/company-details.component';
import { CompanyListComponent } from './components/company/company-list/company-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'company', component: CompanyListComponent },
  { path: 'company/:companyKey', component: CompanyDetailsComponent },
  { path: 'company/:companyKey/department', component: DepartmentListComponent },
  { path: 'company/:companyKey/department/:departmentKey', component: DepartmentDetailsComponent },
  { path: 'company/:companyKey/department/:departmentKey/employee', component: EmployeeListComponent },
  { path: 'company/:companyKey/department/:departmentKey/employee/:employeeKey', component: EmployeeDetailsComponent },
  { path: '',   redirectTo: '/company', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
