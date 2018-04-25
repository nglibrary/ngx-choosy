import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BaseView } from '../base-view';
import { OptionsService, ConfigService } from '../../services';

@Component({
  selector: 'choosy-default',
  templateUrl: 'default.component.html'
})
export class ChoosyDefaultView extends BaseView implements OnInit {
  name = 'default-view';
  constructor(
    protected optionsService: OptionsService,
    protected configService: ConfigService,
    protected elRef: ElementRef,
    protected cdRef: ChangeDetectorRef
  ) {
    super(optionsService, configService, elRef, cdRef);
  }

  ngOnInit() {
    this.init();
  }
}
