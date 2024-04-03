import { HttpClient } from '@angular/common/http';

export abstract class BaseService {
    // protected JSON_URL = 'http://localhost:3000';
    protected BASE_URL = 'http://localhost:7050';
    constructor(protected http: HttpClient) { }
}
