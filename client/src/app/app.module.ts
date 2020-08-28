import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { CompanyListComponent } from './components/company/company-list/company-list.component';
import { CompanyDetailsComponent } from './components/company/company-details/company-details.component';
import { DepartmentDetailsComponent } from './components/department/department-details/department-details.component';
import { DepartmentListComponent } from './components/department/department-list/department-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/shared/navbar/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent,
    EmployeeListComponent,
    CompanyListComponent,
    CompanyDetailsComponent,
    DepartmentDetailsComponent,
    DepartmentListComponent,
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
