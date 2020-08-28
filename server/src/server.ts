import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controllers/employee.controller';
import env from 'dotenv';
env.config();
import { DbContext } from './services/db-context';
import express from 'express';
import bodyParser from 'body-parser';

const context = new DbContext();
const app = express();

// tslint:disable-next-line: deprecation
app.use(bodyParser.json());
// tslint:disable-next-line: deprecation
app.use(bodyParser.urlencoded({ extended: true }));

const dbContext = new DbContext();

const employeeController = new EmployeeController(new EmployeeService(dbContext));

app.get('/employee', employeeController.employees);
app.get('/employee/:key', employeeController.employee);
app.post('/employee', employeeController.create);
app.put('/employee/:key', employeeController.update);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening at ${port}`));
