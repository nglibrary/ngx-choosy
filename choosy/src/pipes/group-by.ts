import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupBy' })
export class GroupByPipe implements PipeTransform {
  transform(collection: any[], property: string): any[] {
    if (!collection) {
      return null;
    }

    const groupedCollection = collection.reduce((previous, current) => {
      if (!previous[current.value[property]]) {
        previous[current.value[property]] = [current];
      } else {
        previous[current.value[property]].push(current);
      }

      return previous;
    }, {});
    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
  }
}
