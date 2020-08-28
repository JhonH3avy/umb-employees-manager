export class Employee {
    key?: number;
    name: string;
    departmentKey: number;

    constructor(name: string, departmentKey: number) {
        this.name = name;
        this.departmentKey = departmentKey;
    }
}
