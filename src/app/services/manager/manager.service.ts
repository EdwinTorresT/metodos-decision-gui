import { Injectable } from '@angular/core';
import IResponseModel from '../../models/responseModel';
import { RequestService } from '../../services/request/request.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(
    private requestService: RequestService,
  ) { }

  callLaplaceMethod(matrix: any, value: any): Promise<IResponseModel> {
    return new Promise(async (resolve, reject) => {
      const body = {
        value,
        matrix
      };
      await this.requestService.post('/laplace', { body, responseType: 'json' }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  callOptimistMethod(matrix: any): Promise<IResponseModel> {
    return new Promise(async (resolve, reject) => {
      const body = {
        matrix
      };
      await this.requestService.post('/optimist', { body, responseType: 'json' }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  callPesimistMethod(matrix: any): Promise<IResponseModel> {
    return new Promise(async (resolve, reject) => {
      const body = {
        matrix
      };
      await this.requestService.post('/pesimist', { body, responseType: 'json' }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  callHurwiczMethod(matrix: any, coefficient: any): Promise<IResponseModel> {
    return new Promise(async (resolve, reject) => {
      const body = {
        coefficient,
        matrix
      };
      await this.requestService.post('/hurwicz', { body, responseType: 'json' }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  
  callSavageMethod(matrix: any): Promise<IResponseModel> {
    return new Promise(async (resolve, reject) => {
      const body = {
        matrix
      };
      await this.requestService.post('/savage', { body, responseType: 'json' }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
