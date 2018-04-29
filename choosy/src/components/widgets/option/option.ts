import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ViewChild,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
  ChangeDetectionStrategy,
  OnChanges
} from '@angular/core';
import { ChoosyOption } from '../../../models';
import { Subject } from 'rxjs/Subject';
import { OptionsService } from '../../../services';

@Component({
  selector: 'choosy-option-widget',
  templateUrl: 'option.html'
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionWidget implements OnInit {
  @Input() option: ChoosyOption;
  @Input() optionTpl: TemplateRef<any>;
  @ViewChild('defaultOptionTpl', { read: TemplateRef })
  defaultOptionTpl: TemplateRef<any>;
  @Output('hover') hover: EventEmitter<any> = new EventEmitter();
  @Output('clicked') clicked: EventEmitter<any> = new EventEmitter();
  constructor(private optionsService: OptionsService) {}
  ngOnInit() {
    this.optionTpl = this.optionTpl || this.defaultOptionTpl;
  }

  hoverStatus(option, status) {
    this.hover.emit({ option, status });
    // this.optionsService.updateOptionHoverState(option);
  }
}
