import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  verses;
  constructor(private dataSvc: DataService) {}

  ngOnInit() {
    // this.verses = this.dataSvc.getVerses();
    // console.log(this.verses);
  }
}
