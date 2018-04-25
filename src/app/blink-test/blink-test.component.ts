import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LargeComponent } from './test-components/large';
import { MinimalComponent } from './test-components/minimal';
import {
  Blink,
  BlinkRef,
  GlobalPosition,
  InsidePlacement,
  OutsidePlacement,
  RelativePosition,
  SlidePosition,
  SlidePlacement
} from '@blink/core';

@Component({
  selector: 'doc-blink-test',
  templateUrl: './blink-test.component.html',
  styles: [ `
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }
  ` ],
  entryComponents: [ MinimalComponent ]
})
export class BlinkTestComponent implements OnInit {

  @ViewChild('refButton', { read: ElementRef }) refButton;

  keys = Object.keys;
  testComponents: { [ x: string ]: any } = {};

  insidePlacements: { name: string, value: InsidePlacement }[] = [
    { name: 'BOTTOM', value: InsidePlacement.BOTTOM },
    { name: 'BOTTOM_LEFT', value: InsidePlacement.BOTTOM_LEFT },
    { name: 'BOTTOM_RIGHT', value: InsidePlacement.BOTTOM_RIGHT },
    { name: 'CENTER', value: InsidePlacement.CENTER },
    { name: 'LEFT', value: InsidePlacement.LEFT },
    { name: 'RIGHT', value: InsidePlacement.RIGHT },
    { name: 'TOP', value: InsidePlacement.TOP },
    { name: 'TOP_LEFT', value: InsidePlacement.TOP_LEFT },
    { name: 'TOP_RIGHT', value: InsidePlacement.TOP_RIGHT }
  ];

  outsidePlacements: { name: string, value: OutsidePlacement }[] = [
    { name: 'BOTTOM', value: OutsidePlacement.BOTTOM },
    { name: 'BOTTOM_LEFT', value: OutsidePlacement.BOTTOM_LEFT },
    { name: 'BOTTOM_RIGHT', value: OutsidePlacement.BOTTOM_RIGHT },
    { name: 'LEFT', value: OutsidePlacement.LEFT },
    { name: 'LEFT_BOTTOM', value: OutsidePlacement.LEFT_BOTTOM },
    { name: 'LEFT_TOP', value: OutsidePlacement.LEFT_TOP },
    { name: 'RIGHT', value: OutsidePlacement.RIGHT },
    { name: 'RIGHT_BOTTOM', value: OutsidePlacement.RIGHT_BOTTOM },
    { name: 'RIGHT_TOP', value: OutsidePlacement.RIGHT_TOP },
    { name: 'TOP', value: OutsidePlacement.TOP },
    { name: 'TOP_LEFT', value: OutsidePlacement.TOP_LEFT },
    { name: 'TOP_RIGHT', value: OutsidePlacement.TOP_RIGHT }
  ];

  slidePlacements: { name: string, value: SlidePlacement }[] = [
    { name: 'LEFT', value: SlidePlacement.LEFT },
    { name: 'RIGHT', value: SlidePlacement.RIGHT }
  ];

  positions: { [ x: string ]: { name: string, pos: any, placements: any } } = {};
  selectedPosition = null;
  selectedPlacement = null;
  selectedComponent = null;

  constructor(private blink: Blink<any>) {
  }

  ngOnInit() {

    this.testComponents[ 'MinimalComponent' ] = MinimalComponent;
    this.testComponents[ 'LargeComponent' ] = LargeComponent;
    this.positions[ 'RelativePosition' ] = {
      name: 'RelativePosition',
      placements: this.outsidePlacements,
      pos: RelativePosition
    };
    this.positions[ 'GlobalPosition' ] = {
      name: 'GlobalPosition',
      placements: this.insidePlacements,
      pos: GlobalPosition
    };
    this.positions[ 'SlidePosition' ] = {
      name: 'SlidePosition',
      placements: this.slidePlacements,
      pos: SlidePosition
    };
  }

  initiateBlink() {
    const comp = this.testComponents[ this.selectedComponent ];
    const placement = this.positions[ this.selectedPosition ].placements.find(z => z.name === this.selectedPlacement).value;
    let options = {};
    if (this.selectedPosition === 'RelativePosition') {
      options = {
        placement: placement,
        hostWidth: 'auto',
        hostHeight: 'auto',
        src: this.refButton.nativeElement,
        autoUpdate: true
      };
    } else if (this.selectedPosition === 'GlobalPosition') {
      options = { placement, hostWidth: 'auto', hostHeight: 'auto' };
    } else {
      options = {};
    }
    console.log('options', options);
    const pos = new this.positions[ this.selectedPosition ].pos(options);

    const blinkRef = this.blink.overlay(pos, null, {
      // backdrop: true,
      windowResizeCallback: function() {
        console.log('resizning...');
      }
    }).host(comp).create();
    blinkRef.open();
  }

}
