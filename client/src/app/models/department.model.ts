export class Department {
    key?: number;
    name: string;
    companyKey: number;

    constructor(name: string, companyKey: number) {
        this.name = name;
        this.companyKey = companyKey;
    }
}
