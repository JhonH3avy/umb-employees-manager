import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from './../../../services/department/department.service';
import { EmployeeService } from './../../../services/employee/employee.service';
import { Employee } from './../../../models/employee.model';
import { Department } from './../../../../../../server/src/models/department.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  canModify: boolean;

  employee = this.fb.group({
    key: [{value: '', disabled: true}],
    name: [{value: '', disabled: this.canModify}, [Validators.required]],
    departmentKey: [{value: '', disabled: this.canModify}, [Validators.required]]
  });

  departments: Department[];

  currentDepartment: Department;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.canModify = false;
    this.departments = await this.departmentService.getDepartments();
    const employeeKey = Number.parseInt(this.route.snapshot.params.employeeKey, 10);
    const departmentKey = Number.parseInt(this.route.snapshot.params.departmentKey, 10);
    const employee = employeeKey === 0 ? new Employee('', departmentKey) : await this.employeeService.getEmployee(employeeKey);
    this.currentDepartment = employee.departmentKey === 0 ? null : this.departments.find(d => d.key === employee.departmentKey);
    this.initForm(employee);
  }

  get key(): FormControl {
    return this.employee.get('key') as FormControl;
  }

  get name(): FormControl {
    return this.employee.get('name') as FormControl;
  }

  get departmentKey(): FormControl {
    return this.employee.get('departmentKey') as FormControl;
  }

  initForm(employee: Employee): void {
    this.key.setValue(employee.key);
    this.name.setValue(employee.name);
    this.departmentKey.setValue(employee.departmentKey);
    this.canModify = true;
  }

  setNewDepartment(department: Department) {
    this.departmentKey.setValue(department.key);
    this.currentDepartment = this.departments.find(d => d.key === department.key);
  }

  async createOrUpdate() {
    const employeeKey = Number.parseInt(this.route.snapshot.params.employeeKey, 10);
    if (employeeKey === 0) {
      const employee = new Employee(this.name.value, this.departmentKey.value);
      employee.key = this.key.value;
      const newEmployee = await this.employeeService.createEmployee(employee);
      await this.router.navigate([`../${newEmployee.key}`], {relativeTo: this.route});
      this.initForm(newEmployee);
    } else {
      const employee = new Employee(this.name.value, this.departmentKey.value);
      employee.key = this.key.value;
      const newEmployee = await this.employeeService.updateEmployee(employee);
      this.initForm(newEmployee);
    }
  }

}
