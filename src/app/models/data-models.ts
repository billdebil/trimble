export class ApiResponse {
  ready: boolean = false
  data?: any | undefined
}


export class SearchModel {
  searchQuery: string = ''
  relevance?: string | undefined
  multiselect?: [] = []
  checkboxOptions?: [] = []
}
