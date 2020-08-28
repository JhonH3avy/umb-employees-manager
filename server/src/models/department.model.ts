export class Department {
    key: number;
    name: string;
    companyKey: number;

    constructor(key: number, name: string, companyKey: number) {
        this.key = key;
        this.name = name;
        this.companyKey = companyKey;
    }
}
