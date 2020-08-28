import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../models/employee.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Promise<Employee[]> {
    return this.http.get<Employee[]>(`${environment.hostUrl}/employee`).toPromise();
  }

  getEmployee(employeeId: string): Promise<Employee> {
    return this.http.get<Employee>(`${environment.hostUrl}/employee/${employeeId}`).toPromise();
  }

  createEmployee(employee: Employee): Promise<Employee> {
    return this.http.post<Employee>(`${environment.hostUrl}/employees`, employee).toPromise();
  }

  updateEmployee(employee: Employee): Promise<Employee> {
    return this.http.put<Employee>(`${environment.hostUrl}/employees`, employee).toPromise();
  }

  deleteEmployee(employeeId: string): Promise<boolean> {
    return this.http.delete<boolean>(`${environment.hostUrl}/employee/${employeeId}`).toPromise();
  }
}
