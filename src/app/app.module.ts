import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {TabViewModule} from "primeng/tabview";
import {HttpClientModule} from "@angular/common/http";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ButtonModule} from "primeng/button";
import {RetryComponent} from "./shared-components/retry-component/retry-component";
import {SearchComponent} from "./shared-components/search-component/search-component";
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import {RadioButtonModule} from "primeng/radiobutton";
import {MultiSelectModule} from "primeng/multiselect";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CheckboxModule} from "primeng/checkbox";
import {SearchResultsComponent} from "./shared-components/search-results-component/search-result.component";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-router.module";
import {NavigationTabsComponent} from "./shared-components/navigation-tabs/navigation-tabs";

@NgModule({
  declarations: [
    AppComponent,
    RetryComponent,
    SearchComponent,
    SearchResultsComponent,
    NavigationTabsComponent
  ],
  imports: [
    BrowserModule,
    TabViewModule,
    HttpClientModule,
    ProgressSpinnerModule,
    RouterModule,
    AppRoutingModule,
    ButtonModule,
    ChipsModule,
    FormsModule,
    RadioButtonModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    CheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
