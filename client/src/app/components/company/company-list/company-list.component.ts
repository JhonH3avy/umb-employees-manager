import { Company } from './../../../../../../server/src/models/company.model';
import { CompanyService } from './../../../services/company/company.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies: Company[];

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.companies = await this.companyService.getCompanies();
  }

  async details(companyKey): Promise<void> {
    if (this.route.snapshot.url.some(s => s.path.endsWith('company'))) {
      await this.router.navigate([`${companyKey}`], {relativeTo: this.route});
    } else {
      await this.router.navigate([`company/${companyKey}`], {relativeTo: this.route});
    }
  }

  async create(): Promise<void> {
    if (this.route.snapshot.url.some(s => s.path.endsWith('company'))) {
      await this.router.navigate([`./0`], {relativeTo: this.route});
    } else {
      await this.router.navigate([`./company/0`], {relativeTo: this.route});
    }
  }

  async remove(companyKey): Promise<void> {
    await this.companyService.deleteCompany(companyKey);
    this.companies = [];
    this.companies = await this.companyService.getCompanies();
  }

}
