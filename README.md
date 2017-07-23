### ngx-choosy

> A dropdown/ selectbox for Angular 4+

#### Features
* Custom template
* Powerful search 
* Highly customizable
* Less restyling
#### Installation
The library can be installed from `npm` or `yarn` package manager.

```bash
> yarn add @nglibrary/ngx-choosy
```

```bash
> npm install @nglibrary/ngx-choosy
```
#### Include module
```ts
// in main app module or shared module

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { NgxChoosyModule } from '@nglibrary/ngx-choosy'; 

@NgModule({
  imports: [
    AppComponent,
    ...
    NgxChoosyModule.forRoot()
  ],
  declarations: [ AppComponent  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```
#### Basic example
```ts
//  in component

import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 names:string[] = ['John','Peter','William','Kannan','Mustaq','Gabriel','Bunny','James'];
 choosy:any;

 onChoosy(event){
  this.choosy=event;
 }
}
```

```html
<!-- in template -->

 <input type="text"  choosySingleSelect [options]="names"  [config]="{}" (isOpen)="isDropdownOpened=$event" (choosy)="onChoosy($event)" />
```

#### Custom template example
```ts
//  in component

import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 address:any[] =[{
    'id': 1,
    'street': '8 Scoville Pass',
    'city': 'Huaniao',
    'country': 'China'
  }, {
    'id': 2,
    'street': '82701 Mosinee Crossing',
    'city': 'Guanabacoa',
    'country': 'Cuba'
  }, {
    'id': 3,
    'street': '78011 Calypso Park',
    'city': 'Bayeux',
    'country': 'Brazil'
  }];
}
```

```html
<!-- in template -->

<input type="text"  choosySingleSelect [options]="address" [config]="{}" [template]="addressTpl" />

<ng-template let-item #addressTpl>
  <div><strong>{{item.street}}</strong></div>
  <div>{{item.city}} - {{item.country}}</div>
</ng-template>
```
#### Choosy event
Choosy exposes three properties, `actions`, `selections` and `notifications`
```ts
{
  actions: {
    open(),
    close(),
    toggle(),
    updateConfig(),
    addOption(),
    removeOption(),
    selectOption(),
    disableOption(),
    clearDisabledOption(),
    clearDisabledOptions(),
    clearSelectedOption(),
    clearSelectedOptions(),
    resetOptions(),
    getSelectedOptions(),
    reloadOptions(),
    clear()
  },
  notifications, // Observable
  selections // Observable
}
```
**`actions`** has several methods to work with options and config dynamically
```ts
// in component
addNewOption() {
  this.choosy.actions.addOption('Casey')
}
```
**`selections`** is an Observable. You can subscribe to user selected items
```ts
onChoosy(event){
  this.choosy=event;
  this.choosy.selections.subscribe(item => {
    console.log(item);
  });
}
```
**`notifications`**  is an another Observable which streams the events.
```ts
onChoosy(event){
  this.choosy=event;
  this.choosy.notifications.subscribe(notification => {
    console.log(notification);
  });
}
```
#### Config
```ts
{
  theme: 'default',
  displayValue:'',
  wrapInput:false,
  labels: {
    inputPlaceholder: 'Choose',
    searchPlaceholder: 'Search',
    noResultsToDisplay: 'No results found',
    noOptionsToDisplay: 'No Options to display',
    noOptionsProvided: 'No Options provided',
    XRecordsMatches: 'Records matching',
    XRecords: 'Records',
  },
  search: {
    enable: true,
    shouldSort: true,
    threshold: 0.0,
    tokenize: true,
    matchAllTokens: true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['value'],
    autoFocus: true,
    hasClearBtn: true
  },
  dropdown: {
    width: 300,
    height: 200,
    animation: false
  },
  footer: {
    enable: true,
    countSummary: true
  }
}
```

> Documentation and demo in progress...
