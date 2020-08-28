import { Company } from './../../models/company.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly controllerName = 'company';

  constructor(private http: HttpClient) { }

  getCompanies(): Promise<Company[]> {
    return this.http.get<Company[]>(`${environment.hostUrl}/${this.controllerName}`).toPromise();
  }

  getCompany(employeeId: string): Promise<Company> {
    return this.http.get<Company>(`${environment.hostUrl}/${this.controllerName}/${employeeId}`).toPromise();
  }

  createCompany(employee: Company): Promise<Company> {
    return this.http.post<Company>(`${environment.hostUrl}/${this.controllerName}`, employee).toPromise();
  }

  updateCompany(employee: Company): Promise<Company> {
    return this.http.put<Company>(`${environment.hostUrl}/${this.controllerName}`, employee).toPromise();
  }

  deleteCompany(employeeId: string): Promise<boolean> {
    return this.http.delete<boolean>(`${environment.hostUrl}/${this.controllerName}/${employeeId}`).toPromise();
  }
}
