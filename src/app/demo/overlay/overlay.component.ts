import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TestComponent } from './test.component';
import { RelativePosition } from '../../module/ngx-choosy/sparkle/position/relative-position';
import { Overlay } from '../../module/ngx-choosy/sparkle/overlay';
import { InsidePlacement, OutsidePlacement } from '../../module/ngx-choosy/sparkle/models';
import { GlobalPosition } from '../../module/ngx-choosy/sparkle/position/global-position';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styles: [
    `
      div.frame{
        background: #E0F7FA;
        margin: 3rem 0;
        border-radius: 3px;
      }
      .center{
        display: inline-block;
        width: 500px;
        margin-left: 10rem;
        margin-top: 5rem;
        padding: 2rem;
        background: #CE93D8;
        border-radius: 3px;
        box-shadow: 0px 13px 28px rgba(189, 189, 189, 0.32);
        color: #fff;
      }
    `
  ]
})
export class OverlayComponent implements OnInit {
  ref1;
  ref2;
  host1;
  host2;
  @ViewChild('src', { read: ElementRef })
  src: ElementRef;
  placements = [
    {
      name: 'top',
      placement: OutsidePlacement.TOP
    },
    {
      name: 'top left',
      placement: OutsidePlacement.TOP_LEFT
    },
    {
      name: 'top right',
      placement: OutsidePlacement.TOP_RIGHT
    },
    {
      name: 'bottom',
      placement: OutsidePlacement.BOTTOM
    },
    {
      name: 'bottom left',
      placement: OutsidePlacement.BOTTOM_LEFT
    },
    {
      name: 'bottom right',
      placement: OutsidePlacement.BOTTOM_RIGHT
    },
    {
      name: 'left',
      placement: OutsidePlacement.LEFT
    },
    {
      name: 'left top',
      placement: OutsidePlacement.LEFT_TOP
    },
    {
      name: 'left bottom',
      placement: OutsidePlacement.LEFT_BOTTOM
    },
    {
      name: 'right',
      placement: OutsidePlacement.RIGHT
    },
    {
      name: 'right top',
      placement: OutsidePlacement.RIGHT_TOP
    },
    {
      name: 'right bottom',
      placement: OutsidePlacement.RIGHT_BOTTOM
    }
  ];

  outsidePlacements = [
    {
      name: 'top left',
      placement: InsidePlacement.TOP_LEFT
    },
    {
      name: 'top',
      placement: InsidePlacement.TOP
    },

    {
      name: 'top right',
      placement: InsidePlacement.TOP_RIGHT
    },
    {
      name: 'right',
      placement: InsidePlacement.RIGHT
    },
    {
      name: 'bottom right',
      placement: InsidePlacement.BOTTOM_RIGHT
    },

    {
      name: 'bottom',
      placement: InsidePlacement.BOTTOM
    },
    {
      name: 'bottom left',
      placement: InsidePlacement.BOTTOM_LEFT
    },
    {
      name: 'left',
      placement: InsidePlacement.LEFT
    },
    {
      name: 'center',
      placement: InsidePlacement.CENTER
    }
  ];
  selectedPlacementIndex: any = 0;
  constructor(private overlay: Overlay) {}

  ngOnInit() {}

  placementChanged() {
    console.log('placementChanged', this.selectedPlacementIndex, this.outsidePlacements[this.selectedPlacementIndex]);
    this.delete();
    this.create(this.outsidePlacements[this.selectedPlacementIndex].placement);
  }
  create(pos) {
    this.ref1 = this.overlay.create(
      new GlobalPosition({
        // src: this.src.nativeElement,
        placement: pos,
        hostHeight: 'auto',
        hostWidth: 200,
        offset: 20
      })
    );
    this.host1 = this.ref1.attachComponent(TestComponent);
  }
  delete() {
    if (this.ref1) {
      this.ref1.destroy();
      this.ref1 = null;
    }
  }
}
