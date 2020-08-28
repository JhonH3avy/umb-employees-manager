import { DepartmentController } from './controllers/department.controller';
import { CompanyController } from './controllers/company.controller';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controllers/employee.controller';
import env from 'dotenv';
env.config();
import { DbContext } from './services/db-context';
import express from 'express';
import bodyParser from 'body-parser';
import { CompanyService } from './services/company.service';
import { DepartmentService } from './services/department.service';

const context = new DbContext();
const app = express();

// tslint:disable-next-line: deprecation
app.use(bodyParser.json());
// tslint:disable-next-line: deprecation
app.use(bodyParser.urlencoded({ extended: true }));

const dbContext = new DbContext();

const companyController = new CompanyController(new CompanyService(dbContext));
const departmentController = new DepartmentController(new DepartmentService(dbContext));
const employeeController = new EmployeeController(new EmployeeService(dbContext));

app.get('/company', companyController.companies);
app.get('/company/:key', companyController.company);
app.post('/company', companyController.create);
app.put('/company/:key', companyController.update);

app.get('/department', departmentController.departments);
app.get('/department/:key', departmentController.department);
app.post('/department', departmentController.create);
app.put('/department/:key', departmentController.update);

app.get('/employee', employeeController.employees);
app.get('/employee/:key', employeeController.employee);
app.post('/employee', employeeController.create);
app.put('/employee/:key', employeeController.update);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening at ${port}`));
