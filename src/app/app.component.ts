import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ManagerService } from './services/manager/manager.service';
import { ToastService } from './services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  products = [];
  matrix: any[] = [];
  responseValue: any[] = [];
  display =  false;
  Hurwicz =  false;
  submit =  false;

  methodsForm = new FormGroup({
    columns: new FormControl('', [Validators.required]),
    rows: new FormControl('', [Validators.required]),
    alpha: new FormControl('', [Validators.required]),
    coefficient: new FormControl('', [Validators.required]),
  });

  constructor(
    private managerService: ManagerService,
    private toastService: ToastService
  ) {}

  generateMatrix(): void {
    this.matrix = [];
    if (this.methodsForm.valid) {
      const params = this.methodsForm.value;
      let columns: any[] = [];
      for (let index = 0; index < (params.rows); index++) {
          let rows: any[] = []
          for (let zindex = 0; zindex < (params.columns); zindex++) {
              rows.push(Math.floor(Math.random() * 9001));
          }
          columns.push(rows);
      }
      this.matrix = columns;
    } else {
      this.toastService.showError('Digite todos los campos', 'Error');
    }
  }

  callLaplaceFunction(): void {
    this.submit = true;
    const value = this.methodsForm.get('alpha')?.value;
    this.managerService.callLaplaceMethod(this.matrix, value).then((response: any) => {
      this.submit = false;
      this.display = true;
      this.responseValue = response.data;
    }).catch((error: any) => {
      console.error(error);
      this.toastService.showError(error.error.data, 'Error');
    });
  }

  callOptimistFunction(): void {
    this.submit = true;
    this.managerService.callOptimistMethod(this.matrix).then((response: any) => {
      this.submit = false;
      this.display = true;
      this.responseValue = response.data;
    }).catch((error: any) => {
      console.error(error);
      this.toastService.showError(error.error.data, 'Error');
    });
  }

  callPesimistFunction(): void {
    this.submit = true;
    this.managerService.callPesimistMethod(this.matrix).then((response: any) => {
      this.submit = false;
      this.display = true;
      this.responseValue = response.data;
    }).catch((error: any) => {
      console.error(error);
      this.toastService.showError(error.error.data, 'Error');
    });
  }

  callHurwiczFunction(): void {
    this.submit = true;
    const coefficient = this.methodsForm.get('coefficient')?.value;
    this.managerService.callHurwiczMethod(this.matrix, coefficient).then((response: any) => {
      this.submit = false;
      this.display = true;
      this.responseValue = response.data;
    }).catch((error: any) => {
      console.error(error);
      this.submit = false;
      this.toastService.showError(error.error.data, 'Error');
    });
  }

  callSavageFunction(): void {
    this.submit = true;
    this.managerService.callSavageMethod(this.matrix).then((response: any) => {
      this.submit = false;
      this.display = true;
      this.responseValue = response.data.value;
    }).catch((error: any) => {
      console.error(error);
      this.toastService.showError(error.error.data, 'Error');
    });
  }

}
