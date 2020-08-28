import { Department } from './../models/department.model';
import { DbContext } from './db-context';

export class DepartmentService {
    private context: DbContext;

    constructor(context: DbContext) {
        this.context = context;
    }

    async getDepartments(): Promise<Department[]> {
        const conn = await this.context.getConnectionFromPool();
        const result = await conn.query('SELECT * FROM departments');
        if (Array.isArray(result)) {
            return result.map((e: any) => {
                    const department = new Department(e.department_name, e.company_key);
                    department.key = e.department_key;
                    return department;
                });
        }
        return [];
    }

    async getDepartment(departmentKey: number): Promise<Department> {
        const conn = await this.context.getConnectionFromPool();
        const result = await conn.query('SELECT * FROM departments WHERE department_key = (?)', [departmentKey]);
        if (Array.isArray(result)) {
            if (result.length === 0) {
                throw new Error(`There is no department with key ${departmentKey}`);
            }
            if (result.length > 1) {
                throw new Error(`There is more than 1 department with key ${departmentKey}`);
            }
            return result
                .map((e: any) => {
                    const department = new Department(e.department_name, e.company_key);
                    department.key = e.department_key;
                    return department;
                })[0];
        }
        return null as unknown as Department;
    }

    async createDepartment(department: Department): Promise<Department> {
        const conn = await this.context.getConnectionFromPool();
        const result = await conn.query('INSERT INTO departments (department_name, company_key) VALUES (?, ?)',
                                        [department.name, department.companyKey]);
        if (result.affectedRows === 0) {
            throw new Error('could not be possible to insert department');
        }
        department.key = result.insertId;
        return department;
    }

    async updateDepartment(department: Department): Promise<Department> {
        const conn = await this.context.getConnectionFromPool();
        const result = await conn.query('UPDATE departments SET department_name = ?, company_key = ? WHERE department_key = ?',
                                        [department.name, department.companyKey, department.key]);
        if (result.affectedRows === 0) {
            throw new Error('could not be possible to insert department');
        }
        return department;
    }

    async deleteDepartment(departmentKey: number): Promise<void> {
        const conn = await this.context.getConnectionFromPool();
        const result = await conn.query('DELETE FROM departments WHERE department_key = ?',
                                        [departmentKey]);
        if (result.affectedRows === 0) {
            throw new Error('could not be possible to insert employee');
        }
    }
}
