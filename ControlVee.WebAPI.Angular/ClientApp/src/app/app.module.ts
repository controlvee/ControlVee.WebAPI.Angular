import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialsModule } from './materials/materials.module';
import { BatchesComponent } from './batches/batches.component';


@NgModule({
  declarations: [
    AppComponent,
    BatchesComponent
  ],
  imports: [
    BrowserModule,
    MaterialsModule
  ],
  exports: [
    BrowserModule,
    MaterialsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
