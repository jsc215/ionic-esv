import { SearchService } from './search.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
  searchForm: FormGroup;
  searchResult: any = '';
  searchSettings = [];
  searchType = 'text';
  errorMsg;
  isLoading = false;
  storedQuery;
  showSearch = false;

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.createSearchForm();
  }
  onChangeSearchType(event) {
    this.searchType = event.detail.value;
    this.searchForm.get('searchType').patchValue(event.detail.value);
    this.searchResult = '';
    this.errorMsg = '';
    this.storedQuery = '';
  }

  showSearchForm() {
    this.showSearch = !this.showSearch;
  }

  incrementPage() {
    if (this.storedQuery) {
      const page = this.searchForm.get('page').value + this.storedQuery.page;
      this.searchForm.patchValue({
        verse: this.storedQuery.verse,
        page
      });

      console.log(this.searchForm.value);
      this.getSearch();
    }
  }

  decrementPage() {
    if (this.storedQuery) {
      const page = this.storedQuery.page - this.searchForm.get('page').value;
      console.log(page);
      this.searchForm.patchValue({
        verse: this.storedQuery.verse,
        page
      });
      console.log(this.searchForm.value);
      this.getSearch();
    }
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      searchType: this.searchType,
      verse: '',
      includeFootnotes: true,
      includeFootnoteBody: true,
      includeVerseNumbers: true,
      page: 1
    });
  }

  getSearch() {
    this.isLoading = true;
    this.showSearch = false;

    this.searchService.search(this.searchForm.value).subscribe(
      data => {
        if (this.searchForm.value.searchType === 'search') {
          this.storedQuery = this.searchForm.value;
        }
        this.searchResult = data;
        this.searchForm.reset(this.createSearchForm());
        this.isLoading = false;
      },
      error => {
        console.log(error.error);
        this.errorMsg = error.error;
        this.searchForm.reset(this.createSearchForm());
        this.isLoading = false;
        this.loadingController.dismiss();
      }
    );
  }
}
