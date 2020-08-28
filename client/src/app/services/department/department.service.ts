import { environment } from './../../../environments/environment';
import { Department } from './../../models/department.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private readonly controllerName = 'department';

  constructor(private http: HttpClient) { }

  getDepartments(): Promise<Department[]> {
    return this.http.get<Department[]>(`${environment.hostUrl}/${this.controllerName}`).toPromise();
  }

  getDepartment(departmentKey: number): Promise<Department> {
    return this.http.get<Department>(`${environment.hostUrl}/${this.controllerName}/${departmentKey}`).toPromise();
  }

  createDepartment(department: Department): Promise<Department> {
    return this.http.post<Department>(`${environment.hostUrl}/${this.controllerName}`, department).toPromise();
  }

  updateDepartment(department: Department): Promise<Department> {
    return this.http.put<Department>(`${environment.hostUrl}/${this.controllerName}/${department.key}`, department).toPromise();
  }

  async deleteDepartment(departmentKey: number): Promise<void> {
    await this.http.delete<boolean>(`${environment.hostUrl}/${this.controllerName}/${departmentKey}`).toPromise();
  }
}
