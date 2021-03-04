import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
    MaterialsModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    BrowserModule,
    MaterialsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
