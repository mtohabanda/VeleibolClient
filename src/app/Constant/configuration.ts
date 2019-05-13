import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public server = 'http://localhost:53251/';
    public apiUrl = 'api/';
    public serverWithApiUrl = this.server + this.apiUrl;
}