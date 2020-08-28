import { Company } from './../../../../../../server/src/models/company.model';
import { CompanyService } from './../../../services/company/company.service';
import { Department } from './../../../models/department.model';
import { DepartmentService } from './../../../services/department/department.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {

  canModify: boolean;

  department = this.fb.group({
    key: [{value: '', disabled: true}],
    name: [{value: '', disabled: this.canModify}],
    companyKey: [{value: '', disabled: this.canModify}]
  });

  companies: Company[];

  currentCompany: Company;

  constructor(
    private companyService: CompanyService,
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.canModify = false;
    this.companies = await this.companyService.getCompanies();
    const departmentKey = Number.parseInt(this.route.snapshot.params.departmentKey, 10);
    const companyKey = Number.parseInt(this.route.snapshot.params.companyKey, 10);
    const department = departmentKey === 0 ? new Department('', companyKey) : await this.departmentService.getDepartment(departmentKey);
    this.currentCompany = this.companies.find(c => c.key === department.companyKey);
    this.initForm(department);
  }

  get key(): FormControl {
    return this.department.get('key') as FormControl;
  }

  get name(): FormControl {
    return this.department.get('name') as FormControl;
  }

  get companyKey(): FormControl {
    return this.department.get('companyKey') as FormControl;
  }

  initForm(department: Department): void {
    this.key.setValue(department.key);
    this.name.setValue(department.name);
    this.companyKey.setValue(department.companyKey);
    this.canModify = true;
  }

  setNewCompany(company: Company) {
    this.companyKey.setValue(company.key);
    this.currentCompany = this.companies.find(c => c.key === company.key);
  }

  async createOrUpdate() {
    const departmentKey = Number.parseInt(this.route.snapshot.params.departmentKey, 10);
    if (departmentKey === 0) {
      const department = new Department(this.name.value, this.companyKey.value);
      department.key = this.key.value;
      const newDepartment = await this.departmentService.createDepartment(department);
      await this.router.navigate([`../${newDepartment.key}`], {relativeTo: this.route});
      this.initForm(newDepartment);
    } else {
      const department = new Department(this.name.value, this.companyKey.value);
      department.key = this.key.value;
      const newDepartment = await this.departmentService.updateDepartment(department);
      this.initForm(newDepartment);
    }
  }
}
