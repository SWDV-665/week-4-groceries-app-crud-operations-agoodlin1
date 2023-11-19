import { Component } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular'
import { GroceriesServiceService } from '../groceries-service.service'
import { InputDialogServiceService } from '../input-dialog-service.service'

interface ItemType {
  name: string;
  quantity: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  title = "Grocery";
  items: ItemType[] = [];

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: (data:any) => {
        console.log('Cancel Add Item');
      },
    },
    {
      text: 'Add Item',
      role: 'confirm',
      handler: (item:any) => {
        console.log('Item Added', item);
        this.dataService.addItem(item);
      },
    },
  ];

  public alertButtons2 = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: (data: any) => {
        console.log('Cancel Edit Item');
      },
    },
    {
      text: 'Edit Item',
      role: 'confirm',
      handler: async (item: ItemType) => {
        console.log('Item Edited', item);
        const index = this.capturedIndex;
        this.dataService.editItem(item, index);
      },
    },
  ];

  constructor(private toastController: ToastController, private alertController: AlertController, public dataService: GroceriesServiceService, public inputService: InputDialogServiceService ) {}
  private capturedIndex!: number;

  ngOnInit() {
    this.loadItems();
  }
  loadItems() {
    this.items = this.dataService.getItems();
  }

  removeItem(item: ItemType, index: any) {
    console.log("Removing Item - ", item, index);
    this.presentToast('top', item, index);
    this.dataService.removeItem(index);
  }

  editItem(item: ItemType, index: any) {
    console.log("Editing Item - ", item, index)
    this.presentToast2('top', item, index);
    this.capturedIndex = index;
    this.presentAlert2('present-alert', item);

  }

  async presentAlert(trigger: string, item:ItemType) {
    this.inputService.alertInputs2[0].value = item.name || '';
    this.inputService.alertInputs2[1].value = item.quantity || '';
    const alert = await this.alertController.create({
      header: 'Add Items',
      subHeader: 'Please add item...',
      inputs: this.inputService.alertInputs,
      buttons: this.alertButtons,
    });

    await alert.present();
  }

  async presentAlert2(trigger: string, item: ItemType) {
    this.inputService.alertInputs2[0].value = item.name || '';
    this.inputService.alertInputs2[1].value = item.quantity || '';
    const alert = await this.alertController.create({
      header: 'Edit Items',
      subHeader: 'Please edit item...',
      inputs: this.inputService.alertInputs2,
      buttons: this.alertButtons2,
    });

    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', item: ItemType, index: any) {
    const toast = await this.toastController.create({
      message: 'Removing Item - ' + index + '...',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  async presentToast2(position: 'top' | 'middle' | 'bottom', item: ItemType, index: any) {
    const toast = await this.toastController.create({
      message: 'Editing Item - ' + index + '...',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  addItem() {
    console.log("Adding Item");
  }
}
