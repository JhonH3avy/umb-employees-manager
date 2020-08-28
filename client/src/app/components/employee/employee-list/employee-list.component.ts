import { EmployeeService } from './../../../services/employee/employee.service';
import { Employee } from './../../../models/employee.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  @Input() showAll: boolean;
  @Input() departmentKey: number;

  employees: Employee[];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadEmployees();
  }

  async details(employeeKey): Promise<void> {
    if (this.route.snapshot.url.some(s => s.path.endsWith('employee'))) {
      await this.router.navigate([`${employeeKey}`], { relativeTo: this.route });
    } else {
      await this.router.navigate([`employee/${employeeKey}`], { relativeTo: this.route });
    }
  }

  async remove(employeeKey): Promise<void> {
    await this.employeeService.deleteEmployee(employeeKey);
    this.employees = [];
    await this.loadEmployees();
  }

  async create(): Promise<void> {
    if (this.route.snapshot.url.some(s => s.path.endsWith('employee'))) {
      await this.router.navigate([`./0`], {relativeTo: this.route});
    } else {
      await this.router.navigate([`./employee/0`], {relativeTo: this.route});
    }
  }

  private async loadEmployees() {
    if (this.showAll) {
      this.employees = await this.employeeService.getEmployees();
    } else {
      this.employees = (await this.employeeService.getEmployees()).slice(0, 9);
    }
    if (this.departmentKey) {
      this.employees = this.employees.filter(e => e.departmentKey === this.departmentKey);
    }
  }

}
