import { SearchService } from './search.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchForm: FormGroup;
  searchResult: string;
  searchSettings = [];
  searchType = 'text';
  errorMsg;
  constructor(private searchService: SearchService, private fb: FormBuilder) {}

  ngOnInit() {
    this.createSearchForm();
  }
  onChangeSearchType(event) {
    this.searchType = event.detail.value;
    this.searchForm.get('searchType').patchValue(event.detail.value);
    this.searchResult = '';
    this.errorMsg = '';
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      searchType: this.searchType,
      verse: '',
      includeFootnotes: true,
      includeFootnoteBody: true,
      includeVerseNumbers: true,
    });
  }

  getSearch() {
    this.searchService.search(this.searchForm.value).subscribe(
      (data) => {
        this.searchResult = data;
        this.searchForm.reset(this.createSearchForm());
      },
      (error) => {
        console.log(error.error);
        this.errorMsg = error.error;
        this.searchForm.reset(this.createSearchForm());
      },
    );
  }
}
