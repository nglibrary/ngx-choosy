import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ChoosyConfig } from '../../../choosy/src/models';

@Component({
  selector: 'doc-choosy-test',
  templateUrl: './choosy-test.component.html',
  styles: []
})
export class ChoosyTestComponent implements OnInit {
  options = [];
  namesAPI = 'https://api.myjson.com/bins/b9zqf';
  moviesAPI = 'https://api.myjson.com/bins/1e1rf3';
  realMovieAPI = 'https://api.themoviedb.org/3/search/movie?api_key=5196210df0fccdb5daf8e9f496563de3&query=';
  config: ChoosyConfig = {
    search: {
      keys: ['value.title']
    },
    autoComplete: {
      enable: true
    },
    groupBy: 'genre'
  };
  previewConfig: ChoosyConfig = {
    search: {
      keys: ['value.title']
    },
    autoComplete: {
      enable: true
    }
  };
  constructor(private http: HttpClient) {}

  ngOnInit() {}
  getNames(keyword) {
    return this.http.get(this.namesAPI);
  }
  getMovies(keyword) {
    return this.http.get(this.moviesAPI);
  }
  fetchRealMovies(keyword) {
    return this.http.get(this.realMovieAPI + keyword).pipe(map((res: any) => res.results));
  }
}
