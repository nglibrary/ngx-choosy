**NGX-CHOOSY** is a very __simple__ and highly __configurable__ select box / dropdown library for Angular 4+. 

`custom templates` `powerful search` `Easy styling` `async loading` `...`


##### Installation

Download the library from npm or yarn

```bash
yarn add @nglibrary/ngx-choosy  // or
npm install @nglibrary/ngx-choosy
```

##### Include in your app/shared module

```javascript

import { NgModule } from '@angular/core';
import { NgxChoosyModule } from '@nglibrary/ngx-choosy'; // <--

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppComponent,
    ...
    NgxChoosyModule.forRoot()
  ],
  declarations: [ /* ... */ ],
  providers: [ /* ... */ ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

##### Add choosy directive to any input element

```js
// in component
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  names: string[];
  constructor() { }
  ngOnInit() {
    this.names = ['John','Peter','Mustaq','Hannah','Willams'];
  }
}
```

```html
<!-- in template -->
 
<input type="text" placeholder="select name" 
  choosySingleSelect 
  [options]="names" 
  [config]="{}" 
  (choosy)="anyMethod($event)"
>
```
