import { Component, OnInit } from '@angular/core';
import { data } from '../data';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';

import { names } from './data';

@Component({
  selector: 'app-x1-simple-array',
  templateUrl: './x1-simple-array.component.html',
  styleUrls: ['./x1-simple-array.component.scss']
})
export class X1SimpleArrayComponent implements OnInit {
  choosy: any;
  choosy2: any;
  items: Observable<any[]>;
  email = 'Melicent Dunkerly';
  users = names;
  constructor(private http: HttpClient) { }

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

  setV() {
    // this.email = {
    //   _id: '5a4a3b882b469cc315752cf9',
    //   guid: 'e6ebde7f-a9f3-4cec-8eff-86c236d0df08',
    //   isActive: true,
    //   balance: '$1,859.80',
    //   name: { first: 'Roseann', last: 'Wolfe' },
    //   company: 'ENJOLA',
    //   email: 'roseann.wolfe@enjola.name',
    //   tags: ['ipsum', 'ea', 'incididunt', 'elit', 'mollit'],
    //   friends: [
    //     { id: 0, name: 'Payne Jordan' },
    //     { id: 1, name: 'Jaime Cohen' },
    //     { id: 2, name: 'Carroll Perez' }
    //   ]
    // };
  }
  dv(value) {
    if (typeof value === 'string') {
      return value.split(' ').join(' and ');
    }
    return value.map(v => v.value).join(' and ');
  }
}
