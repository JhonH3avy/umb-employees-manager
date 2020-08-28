import { Employee } from './../models/employee.model';
import { Request, Response } from 'express';
import { EmployeeService } from '../services/employee.service';


export class EmployeeController {

    constructor(private service: EmployeeService) {}

    employees = async (req: Request, res: Response): Promise<void> => {
        try {
            const employees = await this.service.getEmployees();
            res.json(employees);
        } catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }

    employee = async (req: Request, res: Response): Promise<void> => {
        try {
            const employeeKey = Number.parseInt(req.params.key, 10);
            const employee = await this.service.getEmployee(employeeKey);
            res.json(employee);
        } catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }

    create = async (req: Request, res: Response): Promise<void> => {
        const employee = new Employee(req.body.name, req.body.departmentKey);
        try {
            const result = await this.service.createEmployee(employee);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        const employee = new Employee(req.body.name, req.body.departmentKey);
        const employeeKey = Number.parseInt(req.params.key, 10);
        employee.key = employeeKey;
        try {
            const result = await this.service.updateEmployee(employee);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }
}


