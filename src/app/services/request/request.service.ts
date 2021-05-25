import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import IRequestParams from '../../models/requestParams';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  public async get(endpoint: string, params: IRequestParams): Promise<any> {
    return new Promise((resolve, reject) => {
      const totalParams = this.parseParams(params, endpoint);
      endpoint = environment.apiPath.concat(endpoint);
      totalParams.endpoint = endpoint;
      return this.http.get(totalParams.endpoint, {
          headers: totalParams.options,
          params: params.queryParams,
          responseType: params.responseType,
          observe: 'response',
      }).toPromise()
      .then((res: HttpResponse<any>) => {
        resolve(res.body);
      }).catch((error) => {
        this.handleError(error);
        reject(error);
      });
    });
  }

  public async post(endpoint: string, params: IRequestParams): Promise<any> {
    return new Promise((resolve, reject) => {
      const totalParams = this.parseParams(params, endpoint);
      endpoint = environment.apiPath.concat(endpoint);
      totalParams.endpoint = endpoint;
      const body = totalParams.params.body;
      this.http.post(totalParams.endpoint, body, {
        headers: totalParams.options,
        params: totalParams.params.queryParams,
        responseType: totalParams.params.responseType,
        observe: 'response'
      }).toPromise()
      .then((res: HttpResponse<any>) => {
        resolve(res.body);
      }).catch((error) => {
        this.handleError(error);
        reject(error);
      });
    });
  }

  public async delete(endpoint: string, params: IRequestParams): Promise<any> {
    return new Promise((resolve, reject) => {
      const totalParams = this.parseParams(params, endpoint);
      endpoint = environment.apiPath.concat(endpoint);
      totalParams.endpoint = endpoint;
      return this.http.delete(totalParams.endpoint, {
        headers: totalParams.options,
        params: totalParams.params.queryParams,
        responseType: totalParams.params.responseType,
        observe: 'response'
      }).toPromise()
      .then((res: HttpResponse<any>) => {
        resolve(res.body);
      }).catch((error) => {
        this.handleError(error);
        reject(error);
      });
    });
  }

  public async put(endpoint: string, params: IRequestParams): Promise<any> {
    return new Promise((resolve, reject) => {
      const totalParams = this.parseParams(params, endpoint);
      endpoint = environment.apiPath.concat(endpoint);
      totalParams.endpoint = endpoint;
      const body = totalParams.params.body;
      return this.http.put(totalParams.endpoint, body, {
        headers: totalParams.options,
        params: totalParams.params.queryParams,
        responseType: totalParams.params.responseType,
        observe: 'response'
      }).toPromise()
      .then((res: HttpResponse<any>) => {
        resolve(res.body);
      }).catch((error) => {
        this.handleError(error);
        reject(error);
      });
    });
  }

  private parseParams(params: IRequestParams, endpoint: string): any {
    let options = new HttpHeaders();
    params = params || {};
    params.body = params.body || {};
    params.responseType = params.responseType || 'json';
    options = params.headers ? this.assingHeaders(options, params.headers) : options;
    options = !!params.externalEndpoint ? this.assingHeaders(options, params.headers) : options;
    options = options.set('Content-Type', 'application/json');
    if (params.body.constructor.name === 'FormData') {
      options = options.delete('Content-Type', '');
    }
    return { endpoint, params, options };
  }

  private assingHeaders(head: HttpHeaders, pHeaders: any): HttpHeaders {
    const headerNames: string[] = Object.keys(pHeaders);
    headerNames.forEach(name => {
      head = head.set(name, pHeaders[name]);
    });
    return head;
  }

  private handleError(error: any): void {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${JSON.stringify(error.error)}`);
  }
}
