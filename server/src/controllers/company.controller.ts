import { Company } from './../models/company.model';
import { CompanyService } from './../services/company.service';
import { Request, Response } from 'express';
export class CompanyController {
    constructor(private service: CompanyService) {}

    companies = async (req: Request, res: Response): Promise<void> => {
        try {
            const employees = await this.service.getCompanies();
            res.json(employees);
        } catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }

    company = async (req: Request, res: Response): Promise<void> => {
        try {
            const companyKey = Number.parseInt(req.params.key, 10);
            const company = await this.service.getCompany(companyKey);
            res.json(company);
        } catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }

    create = async (req: Request, res: Response): Promise<void> => {
        const company = new Company(req.body.name);
        try {
            const result = await this.service.createCompany(company);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        const company = new Company(req.body.name);
        const companyKey = Number.parseInt(req.params.key, 10);
        company.key = companyKey;
        try {
            const result = await this.service.updateCompany(company);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }
}
