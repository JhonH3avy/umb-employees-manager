import { Company } from './../../../models/company.model';
import { CompanyService } from './../../../services/company/company.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  canModify: boolean;

  company = this.fb.group({
    key: [{value: '', disabled: true}],
    name: [{value: '', disabled: this.canModify}]
  });

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.canModify = false;
    const companyKey = Number.parseInt(this.route.snapshot.params.companyKey, 10);
    const company = companyKey === 0 ? new Company('') : await this.companyService.getCompany(companyKey);
    this.initForm(company);
  }

  get key(): FormControl {
    return this.company.get('key') as FormControl;
  }

  get name(): FormControl {
    return this.company.get('name') as FormControl;
  }

  initForm(company: Company): void {
    this.key.setValue(company.key);
    this.name.setValue(company.name);
    this.canModify = true;
  }

  async createOrUpdate() {
    const companyKey = Number.parseInt(this.route.snapshot.params.companyKey, 10);
    if (companyKey === 0) {
      const company = new Company(this.name.value);
      company.key = this.key.value;
      const newCompany = await this.companyService.createCompany(company);
      await this.router.navigate([`../${newCompany.key}`], {relativeTo: this.route});
      this.initForm(newCompany);
    } else {
      const company = new Company(this.name.value);
      company.key = this.key.value;
      const newCompany = await this.companyService.updateCompany(company);
      this.initForm(newCompany);
    }
  }

}
