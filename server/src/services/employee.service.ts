import { DbContext } from './db-context';
import { Employee } from '../models/employee.model';

export class EmployeeService {

    private context: DbContext;

    constructor(context: DbContext) {
        this.context = context;
    }

    async getEmployees(): Promise<Employee[]> {
        const conn = await this.context.getConnectionFromPool();
        const result = await conn.query('SELECT * FROM employees');
        if (Array.isArray(result)) {
            return result.map((e: any) => {
                    const employee = new Employee(e.employee_name, e.department_key);
                    employee.key = e.employee_key;
                    return employee;
                });
        }
        return [];
    }

    async getEmployee(employeeKey: number): Promise<Employee> {
        const conn = await this.context.getConnectionFromPool();
        const result = await conn.query('SELECT * FROM employees WHERE employee_key = (?)', [employeeKey]);
        if (Array.isArray(result)) {
            if (result.length === 0) {
                throw new Error(`There is no employee with key ${employeeKey}`);
            }
            if (result.length > 1) {
                throw new Error(`There is more than 1 employees with key ${employeeKey}`);
            }
            return result
                .map((e: any) => {
                    const employee = new Employee(e.employee_name, e.department_key);
                    employee.key = e.employee_key;
                    return employee;
                })[0];
        }
        return null as unknown as Employee;
    }

    async createEmployee(employee: Employee): Promise<Employee> {
        const conn = await this.context.getConnectionFromPool();
        const result = await conn.query('INSERT INTO employees (employee_name, department_key) VALUES (?, ?)',
                                        [employee.name, employee.departmentKey]);
        if (result.affectedRows === 0) {
            throw new Error('could not be possible to insert employee');
        }
        employee.key = result.insertId;
        return employee;
    }

    async updateEmployee(employee: Employee): Promise<Employee> {
        const conn = await this.context.getConnectionFromPool();
        const result = await conn.query('UPDATE employees SET employee_name = ?, department_key = ? WHERE employee_key = ?',
                                        [employee.name, employee.departmentKey, employee.key]);
        if (result.affectedRows === 0) {
            throw new Error('could not be possible to insert employee');
        }
        return employee;
    }

    async deleteEmployee(employeeKey: number): Promise<void> {
        const conn = await this.context.getConnectionFromPool();
        const result = await conn.query('DELETE FROM employees WHERE employee_key = ?',
                                        [employeeKey]);
        if (result.affectedRows === 0) {
            throw new Error('could not be possible to insert employee');
        }
    }
}
