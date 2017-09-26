import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from '../services/document.service';
import { Project } from '../models/project';
import { Search } from '../models/search';
import { Proponent } from '../models/proponent';
import { ProjectService } from '../services/project.service';
import { ProponentService } from '../services/proponent.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchComponent implements OnInit {
  results: Search[];
  page: number;
  limit: number;
  noMoreResults: boolean;
  ranSearch: boolean;
  projects: Array<Project>;
  proponents: Array<Proponent>;
  projectArray: Array<string>;
  public loading: boolean;
  protoSearchActive: boolean;
  showAdvancedFields: boolean;

  constructor(calender: NgbCalendar,
              private documentService: DocumentService,
              private projectService: ProjectService,
              private proponentService: ProponentService,
              private _changeDetectionRef: ChangeDetectorRef) {

    this.limit         = 15;
    this.noMoreResults = true;
    this.ranSearch     = false;

    proponentService.getAll().subscribe(
      data => {
        this.proponents = data;
        // Needed in development mode - not required in prod.
        this._changeDetectionRef.detectChanges();
      },
      error => console.log(error)
    );
    projectService.getAll().subscribe(
      data => {
        this.projects = data;
        this.projectArray = [];
        this.projects.forEach((project, index) => {
          this.projectArray.push(project._id);
        });
        // Needed in development mode - not required in prod.
        this._changeDetectionRef.detectChanges();
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
    this.showAdvancedFields = false;
  }

  toggleAdvancedSearch() {
    this.showAdvancedFields = !this.showAdvancedFields;
  }

  onSubmit(form: any) {
    this.page = 0;
    this.ranSearch = true;
    this.results = [];

    // Get the keywords
    let keywordsArr = null;
    if (form.keywordInput) {
      keywordsArr = form.keywordInput.split(' ');
    }

    this.loading = true;
    this.documentService.get(keywordsArr,
                            form.projectInput,
                            this.projects,
                            form.operatorInput,
                            form.ownerInput,
                            form.dateRangeStartInput,
                            form.dateRangeEndInput,
                            this.page,
                            this.limit)
    .subscribe(
      data => {
        // Push in 1st call
        data[0].forEach(i => {
          this.results.push(i);
        });
        // push in 2nd call
        data[1].forEach(i => {
          this.results.push(i);
        });
        this.loading = false;
        this.noMoreResults = (data[0].length === 0 && data[1].length === 0);
        // Needed in development mode - not required in prod.
        this._changeDetectionRef.detectChanges();
      },
      error => console.log(error)
    );
  }

  loadMore(form: any) {
    this.page += 1;
    let keywordsArr = null;
    if (form.keywordInput) {
      keywordsArr = form.keywordInput.split(' ');
    }
    this.loading = true;
    this.documentService.get(keywordsArr,
                            form.projectInput,
                            this.projects,
                            form.operatorInput,
                            form.ownerInput,
                            form.dateRangeStartInput,
                            form.dateRangeEndInput,
                            this.page,
                            this.limit)
    .subscribe(
      data => {
        data[0].forEach(i => {
          this.results.push(i);
        });
        // push in 2nd call
        data[1].forEach(i => {
          this.results.push(i);
        });
        this.loading = false;
        this.noMoreResults = (data[0].length === 0 && data[1].length === 0);
        this._changeDetectionRef.detectChanges();
      },
      error => console.log(error)
    );
  }
}