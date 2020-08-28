import { Router, ActivatedRoute } from '@angular/router';
import { Department } from './../../../models/department.model';
import { DepartmentService } from './../../../services/department/department.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  @Input() showAll?: boolean;
  @Input() companyKey: number;

  departments: Department[];

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadDepartments();
  }

  async details(departmentKey): Promise<void> {
    if (this.route.snapshot.url.some(s => s.path.endsWith('department'))) {
      await this.router.navigate([`${departmentKey}`], { relativeTo: this.route });
    } else {
      await this.router.navigate([`department/${departmentKey}`], { relativeTo: this.route });
    }
  }

  async remove(departmentKey): Promise<void> {
    await this.departmentService.deleteDepartment(departmentKey);
    this.departments = [];
    await this.loadDepartments();
  }

  async create(): Promise<void> {
    if (this.route.snapshot.url.some(s => s.path.endsWith('department'))) {
      await this.router.navigate([`./0`], {relativeTo: this.route});
    } else {
      await this.router.navigate([`./department/0`], {relativeTo: this.route});
    }
  }

  private async loadDepartments() {
    if (this.showAll) {
      this.departments = await this.departmentService.getDepartments();
    } else {
      this.departments = (await this.departmentService.getDepartments()).slice(0, 9);
    }
    if (this.companyKey) {
      this.departments = this.departments.filter(d => d.companyKey === this.companyKey);
    }
  }
}
