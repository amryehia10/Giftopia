import { HttpClient } from '@angular/common/http';

export abstract class BaseService {
    protected Base_URL = 'http://localhost:3000';
    constructor(protected http: HttpClient) { }
}
