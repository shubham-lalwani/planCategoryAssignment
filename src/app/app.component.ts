import { Component, VERSION, OnInit, NgIterable } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  planName = '';
  autherName = '';
  subCategories: any[];
  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.planName = this.dataService.PLAN.name;
    this.autherName = this.dataService.PLAN.userCreated;
    this.makeSubCategory();
  }

  makeSubCategory() {
    this.subCategories = this.dataService.CATEGORIES.filter(
      (obj) => obj.parentNoteCategoryId != null
    );
  }
  getNotes(id): NgIterable<any> {
    let data = this.dataService.NOTES.filter((obj) => obj.categoryId == id);
    data = data.sort(
      (a, b) =>
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    );
    return data;
  }

  getSortedCategories(): NgIterable<any> {
    let data = this.dataService.CATEGORIES.filter(
      (obj) => obj.parentNoteCategoryId == null
    );
    data = data.sort(this.compare);
    return data;
  }
  compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  isNotesPresent(id): boolean {
    return !!this.dataService.NOTES.filter((obj) => obj.categoryId == id)
      .length;
  }
  show(id) {
    console.log(id);
  }
}
