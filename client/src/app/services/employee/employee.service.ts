import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../models/employee.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly controllerName = 'company';

  constructor(private http: HttpClient) { }

  getEmployees(): Promise<Employee[]> {
    return this.http.get<Employee[]>(`${environment.hostUrl}/${this.controllerName}`).toPromise();
  }

  getEmployee(employeeId: string): Promise<Employee> {
    return this.http.get<Employee>(`${environment.hostUrl}/${this.controllerName}/${employeeId}`).toPromise();
  }

  createEmployee(employee: Employee): Promise<Employee> {
    return this.http.post<Employee>(`${environment.hostUrl}/${this.controllerName}`, employee).toPromise();
  }

  updateEmployee(employee: Employee): Promise<Employee> {
    return this.http.put<Employee>(`${environment.hostUrl}/${this.controllerName}`, employee).toPromise();
  }

  async deleteEmployee(employeeId: string): Promise<void> {
    await this.http.delete<boolean>(`${environment.hostUrl}/${this.controllerName}/${employeeId}`).toPromise();
  }
}
