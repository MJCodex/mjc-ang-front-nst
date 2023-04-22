import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutDefaultComponent} from "./shared/layout/layout-default/layout-default.component";
import {
  LayoutDefaultFooterComponent
} from "./shared/layout/layout-default/layout-default-footer/layout-default-footer.component";
import {
  LayoutDefaultNavBarComponent
} from "./shared/layout/layout-default/layout-default-nav-bar/layout-default-nav-bar.component";

@NgModule({
  declarations: [
    AppComponent,
    LayoutDefaultComponent,
    LayoutDefaultFooterComponent,
    LayoutDefaultNavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
