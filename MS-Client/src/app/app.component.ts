import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, AlertController } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { MapsPage } from '../pages/maps/maps';

import {MEDICINEDATA} from './mock-data'
import { MedicineDetails } from './app.model'

export class credentials{
  userName:string;
  passWord:string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;
  credentials:credentials[];
  userName:string;
  passWord:string;
  isUserAuthenticated:boolean = false;
  loginType:string  = "user";
  actionType:string = "";
  medicineData:MedicineDetails[] = MEDICINEDATA;
  searchMedicineInput:string = "";

  constructor(public platform: Platform,public menu: MenuController,public alertCtrl:AlertController) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      { title: 'Search Medicines',component:MapsPage}
    ];
    this.credentials = [
      {userName:"subbu",passWord:"subbu"},
      {userName:"subrahmanyam",passWord:"subrahmanyam"},
      {userName:"ionic",passWord:"ionic"}];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
  AuthenticateUser(){
    for(let cs of this.credentials){
      if(cs.userName == this.userName && cs.passWord == this.passWord){
        console.log(true);
          this.isUserAuthenticated = true;
          return;
      }
    }
    this.showAlert();
    this.isUserAuthenticated = false;
  }
  showAlert(){
    let alert = this.alertCtrl.create({
      title: 'Invalid credentials',
      subTitle: 'Entered Username or Password are incorrect. please try again.',
      buttons: ['OK']
    });
    alert.present();
  } 
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
