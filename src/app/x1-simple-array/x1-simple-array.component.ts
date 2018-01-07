import { Component, OnInit } from '@angular/core';
import { data } from '../data';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-x1-simple-array',
  templateUrl: './x1-simple-array.component.html',
  styleUrls: ['./x1-simple-array.component.scss']
})
export class X1SimpleArrayComponent implements OnInit {
  choosy: any;
  choosy2: any;
  items: Observable<any[]>;
  name = 'lokesh';
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.items = data;
    this.items = this.http
      .get('https://api.myjson.com/bins/i34kb')
      .map((res: any) => res.db)
      .delay(3000);
  }
  onChoosy(event) {
    this.choosy = event;
  }
  onChoosy2(event) {
    this.choosy2 = event;
  }
  try(a) {
    console.log('ref', a);
  }

  remove(cRef) {
    cRef.listService.removeOption(o => o.email === 'battle.dorsey@quinex.me');
  }
  add(cRef) {
    const d = {
      _id: '5a4a3b885417e54bbc946410',
      guid: '59575578-1075-46ec-ab10-a81fc3275db6',
      isActive: true,
      balance: '$3,505.68',
      name: {
        first: 'Lokesh',
        last: 'Rajendran'
      },
      company: 'ONION',
      email: 'lokesh.aero@gmail.com',
      tags: ['enim', 'in', 'Lorem', 'in', 'elit'],
      friends: [
        {
          id: 0,
          name: 'Lacey Mcclure'
        },
        {
          id: 1,
          name: 'Jill Nieves'
        },
        {
          id: 2,
          name: 'Merle Whitley'
        }
      ]
    };
    cRef.listService.addOptions(d);
  }
}
