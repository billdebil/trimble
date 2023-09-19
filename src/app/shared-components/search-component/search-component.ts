import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SearchModel} from "../../models/data-models";


@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.html',
  styleUrls: ['./search-component.scss']
})
export class SearchComponent {
  @Input() minSearchLength: number = 2
  @Input() maxSearchLength: number = 25
  @Input() relevanceOptions: any[] = []
  @Input() multiselect: any[] = []
  @Input() checkboxValues: any[] = []

  @Output() searchEvent:EventEmitter<SearchModel> = new EventEmitter<SearchModel>()

  public searchModel: SearchModel = new SearchModel()

  emitSearchQuery() {
    this.searchEvent.emit(this.searchModel)
  }
}
