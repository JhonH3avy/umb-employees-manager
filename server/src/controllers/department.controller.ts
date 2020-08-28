import { Department } from './../models/department.model';
import { DepartmentService } from './../services/department.service';
import { Request, Response } from 'express';
export class DepartmentController {
    constructor(private service: DepartmentService) {}

    departments = async (req: Request, res: Response): Promise<void> => {
        try {
            const departments = await this.service.getDepartments();
            res.json(departments);
        } catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }

    department = async (req: Request, res: Response): Promise<void> => {
        try {
            const departmentKey = Number.parseInt(req.params.key, 10);
            const department = await this.service.getDepartment(departmentKey);
            res.json(department);
        } catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }

    create = async (req: Request, res: Response): Promise<void> => {
        const department = new Department(req.body.name, req.body.companyKey);
        try {
            const result = await this.service.createDepartment(department);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        const department = new Department(req.body.name, req.body.companyKey);
        const departmentKey = Number.parseInt(req.params.key, 10);
        department.key = departmentKey;
        try {
            const result = await this.service.updateDepartment(department);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        const departmentKey = Number.parseInt(req.params.key, 10);
        try {
            await this.service.deleteDepartment(departmentKey);
            res.status(200).end();
        } catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }
}
