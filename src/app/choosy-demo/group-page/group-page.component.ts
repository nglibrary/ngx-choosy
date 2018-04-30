import { Component, OnInit } from '@angular/core';
import { ChoosyDemoBaseComponent } from '../base';
import { blackMirrorEpisodes } from '../_data/black-mirror';

@Component({
  selector: 'doc-group-page',
  templateUrl: './group-page.component.html',
  styles: []
})
export class GroupPageComponent extends ChoosyDemoBaseComponent implements OnInit {
  options = blackMirrorEpisodes;

  ngOnInit() {}
}
