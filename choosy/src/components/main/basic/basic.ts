import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { OptionsService, ConfigService } from '../../../services';
import { ChoosyBase, BASE_CONFIG } from '../base.class';

@Component({
  ...BASE_CONFIG,
  selector: 'choosy-basic',
  templateUrl: 'basic.html',
  styleUrls: ['basic.scss']
})
export class Basic extends ChoosyBase implements OnInit {
  name = 'choosy-basic';
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
    if (this.config.autoComplete.enable) {
      this.autoCompletion();
    }
    this.watchKeyPress();
    this.watchKeyboardActions();
  }

  ngOnDestroy() {
    this._cleanUp();
  }
}