import { Company } from './../../models/company.model';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getCompany(companyKey: number): Promise<Company> {
    return this.http.get<Company>(`${environment.hostUrl}/${this.controllerName}/${companyKey}`).toPromise();
  }

  createCompany(company: Company): Promise<Company> {
    return this.http.post<Company>(`${environment.hostUrl}/${this.controllerName}`, company).toPromise();
  }

  updateCompany(company: Company): Promise<Company> {
    return this.http.put<Company>(`${environment.hostUrl}/${this.controllerName}/${company.key}`, company).toPromise();
  }

  deleteCompany(companyKey: number): Promise<boolean> {
    return this.http.delete<boolean>(`${environment.hostUrl}/${this.controllerName}/${companyKey}`).toPromise();
  }
}
