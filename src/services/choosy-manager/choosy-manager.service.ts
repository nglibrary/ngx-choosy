import { Injectable } from '@angular/core';
import { ChoosyResultsComponent } from './../../components';

@Injectable()
export class ChoosyManagerService {
  public instances: { ins: ChoosyResultsComponent, insID: any }[] = [];
  addInstance(ins: ChoosyResultsComponent, insID: any) {
    this.instances.push({ ins, insID });
  }
}
