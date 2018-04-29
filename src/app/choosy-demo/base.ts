import { Component, OnInit } from '@angular/core';

export class ChoosyDemoBaseComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  captureEvents(e) {
    console.log('events', e);
  }
}
