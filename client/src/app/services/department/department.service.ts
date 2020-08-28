import { environment } from './../../../environments/environment';
import { Department } from './../../models/department.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private readonly controllerName = 'company';

  constructor(private http: HttpClient) { }

  getDepartments(): Promise<Department[]> {
    return this.http.get<Department[]>(`${environment.hostUrl}/${this.controllerName}`).toPromise();
  }

  getDepartment(employeeId: string): Promise<Department> {
    return this.http.get<Department>(`${environment.hostUrl}/${this.controllerName}/${employeeId}`).toPromise();
  }

  createDepartment(employee: Department): Promise<Department> {
    return this.http.post<Department>(`${environment.hostUrl}/${this.controllerName}`, employee).toPromise();
  }

  updateDepartment(employee: Department): Promise<Department> {
    return this.http.put<Department>(`${environment.hostUrl}/${this.controllerName}`, employee).toPromise();
  }

  async deleteDepartment(employeeId: string): Promise<void> {
    await this.http.delete<boolean>(`${environment.hostUrl}/${this.controllerName}/${employeeId}`).toPromise();
  }
}
