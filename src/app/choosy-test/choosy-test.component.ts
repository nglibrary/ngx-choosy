import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChoosyConfig } from 'choosy/src/models';

@Component({
  selector: 'doc-choosy-test',
  templateUrl: './choosy-test.component.html',
  styles: []
})
export class ChoosyTestComponent implements OnInit {
  options = [];
  namesAPI = 'https://api.myjson.com/bins/b9zqf';
  moviesAPI = 'https://api.myjson.com/bins/1e1rf3';
  config: ChoosyConfig = {
    search: {
      keys: ['value.title']
    },
    autoComplete: {
      enable: true
    },
    groupBy: 'genre'
  };
  constructor(private http: HttpClient) {}

  ngOnInit() {}
  getNames(keyword) {
    return this.http.get(this.namesAPI);
  }
  getMovies(keyword) {
    return this.http.get(this.moviesAPI);
  }
}
