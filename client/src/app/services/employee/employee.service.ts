import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../models/employee.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly controllerName = 'employee';

  constructor(private http: HttpClient) { }

  getEmployees(): Promise<Employee[]> {
    return this.http.get<Employee[]>(`${environment.hostUrl}/${this.controllerName}`).toPromise();
  }

  getEmployee(employeeKey: number): Promise<Employee> {
    return this.http.get<Employee>(`${environment.hostUrl}/${this.controllerName}/${employeeKey}`).toPromise();
  }

  createEmployee(employee: Employee): Promise<Employee> {
    return this.http.post<Employee>(`${environment.hostUrl}/${this.controllerName}`, employee).toPromise();
  }

  updateEmployee(employee: Employee): Promise<Employee> {
    return this.http.put<Employee>(`${environment.hostUrl}/${this.controllerName}/${employee.key}`, employee).toPromise();
  }

  async deleteEmployee(employeeKey: number): Promise<void> {
    await this.http.delete<boolean>(`${environment.hostUrl}/${this.controllerName}/${employeeKey}`).toPromise();
  }
}
