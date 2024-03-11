import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { MainComponent } from './main/main.component';
import { FactsComponent } from './main/facts/facts.component';
import { AsideComponent } from './main/aside/aside.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FactsComponent,
    AsideComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
