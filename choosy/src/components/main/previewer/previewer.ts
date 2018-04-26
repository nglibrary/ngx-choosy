import { Component, OnInit, ElementRef, ChangeDetectorRef, TemplateRef, Input } from '@angular/core';
import { OptionsService, ConfigService } from '../../../services';
import { ChoosyBase, BASE_CONFIG } from '../base.class';

@Component({
  ...BASE_CONFIG,
  selector: 'choosy-previewer',
  templateUrl: 'previewer.html',
  styleUrls: ['previewer.scss']
})
export class Previewer extends ChoosyBase implements OnInit {
  @Input() previewTpl: TemplateRef<any>;
  name = 'choosy-previewer';
  hoveredOption = null;
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
