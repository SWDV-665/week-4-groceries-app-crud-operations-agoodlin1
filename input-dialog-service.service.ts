import { Injectable } from '@angular/core';
import { GroceriesServiceService } from './groceries-service.service'
import { ToastController, AlertController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public dataService: GroceriesServiceService) {
  }
  public capturedIndex!: number;
  public alertInputs = [
    {
      name: 'name',
      placeholder: 'Grocery Item',
    },
    {
      name: 'quantity',
      placeholder: 'Quantity',
    },
  ];


  public alertInputs2 = [
    {
      name: 'name',
      placeholder: 'Grocery Item',
      value: '',
    },
    {
      name: 'quantity',
      placeholder: 'Quantity',
      value: '',
    },
  ];


}
