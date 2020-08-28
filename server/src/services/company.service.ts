import { Company } from './../models/company.model';
import { DbContext } from './db-context';

export class CompanyService {
    private context: DbContext;

    constructor(context: DbContext) {
        this.context = context;
    }

    async getCompanies(): Promise<Company[]> {
        const conn = await this.context.getConnectionFromPool();
        const result = await conn.query('SELECT * FROM companies');
        await conn.end();
        if (Array.isArray(result)) {
            return result.map((e: any) => {
                    const company = new Company(e.company_name);
                    company.key = e.company_key;
                    return company;
                });
        }
        return [];
    }

    async getCompany(companyKey: number): Promise<Company> {
        const conn = await this.context.getConnectionFromPool();
        const result = await conn.query('SELECT * FROM companies WHERE company_key = (?)', [companyKey]);
        await conn.end();
        if (Array.isArray(result)) {
            if (result.length === 0) {
                throw new Error(`There is no company with key ${companyKey}`);
            }
            if (result.length > 1) {
                throw new Error(`There is more than 1 company with key ${companyKey}`);
            }
            return result
                .map((e: any) => {
                    const company = new Company(e.company_name);
                    company.key = e.company_key;
                    return company;
                })[0];
        }
        return null as unknown as Company;
    }

    async createCompany(company: Company): Promise<Company> {
        const conn = await this.context.getConnectionFromPool();
        const result = await conn.query('INSERT INTO companies (company_name) VALUES (?)',
                                        [company.name]);
        await conn.end();
        if (result.affectedRows === 0) {
            throw new Error('could not be possible to insert company');
        }
        company.key = result.insertId;
        return company;
    }

    async updateCompany(company: Company): Promise<Company> {
        const conn = await this.context.getConnectionFromPool();
        const result = await conn.query('UPDATE companies SET company_name = ? WHERE employee_key = ?',
                                        [company.name, company.key]);
        await conn.end();
        if (result.affectedRows === 0) {
            throw new Error('could not be possible to update company');
        }
        return company;
    }

    async deleteCompany(companyKey: number): Promise<void> {
        const conn = await this.context.getConnectionFromPool();
        const result = await conn.query('DELETE FROM companies WHERE company_key = ?',
                                        [companyKey]);
        await conn.end();
        if (result.affectedRows === 0) {
            throw new Error('could not be possible to delete employee');
        }
    }
}
