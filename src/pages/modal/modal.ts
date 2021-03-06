import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// Providers.
import { AuthProvider } from '../../providers/auth/auth';
import { LogProvider } from '../../providers/log/log';
// Service.
import { TranslateService } from '@ngx-translate/core';

import * as firebase from 'firebase';


@IonicPage({
  segment: "rate-my-pain/:logId"
})
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  // Sets the view to painbefore when opening the modal.
  // content: string = "painbefore";

  public currentLog: any = {};

  public catRef: any;
  public cat: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public logProvider: LogProvider, public translateService: TranslateService) {
    this.catRef = firebase.storage().ref().child('img/activity/');

    this.catRef.child('running.jpg').getDownloadURL().then((url) => {
      this.cat = url;

    });
  }

  ionViewDidLoad() {
    // Gets the opened log entry and shows the content in the modal.
    this.logProvider
      .getLogDetail(this.navParams.get("logId"))
      .on("value", logSnapshot => {
        this.currentLog = logSnapshot.val();
        this.currentLog.id = logSnapshot.key;
      });
  }

    

}
