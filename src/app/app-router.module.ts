import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchResultsComponent} from "./shared-components/search-results-component/search-result.component";
import {CommonModule} from "@angular/common";
import {NavigationTabsComponent} from "./shared-components/navigation-tabs/navigation-tabs";

export const routes: Routes = [
  {path: '', component: NavigationTabsComponent},
  {path: 'search-results', component: SearchResultsComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
