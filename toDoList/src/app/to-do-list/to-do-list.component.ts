import {Component, OnChanges, OnInit} from '@angular/core';
import {TODO} from "./Model/TODO";
import {ToDoServiceService} from "./toDoService/to-do-service.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit, OnChanges {
  toDoList$: BehaviorSubject<TODO[]> = this.service.getToDoList();
  listSearch: TODO[] = [];
  listSelected: TODO[] = [];
  details: boolean[] = [];
  keySearch: string = '';

  constructor(private service: ToDoServiceService) {
  }

  ngOnInit(): void {
  }

  deleteItem(itemToRemove: TODO) {
    this.service.removeItem(itemToRemove);
  }

  deleteMultiItem(itemToRemove: TODO[]) {
    this.service.removeMultiItem(itemToRemove);
  }

  addListSelected(itemSelected: TODO) {
    this.listSelected.unshift(itemSelected);
  }

  ngOnChanges(): void {
    this.toDoList$ = this.service.getToDoList();
  }

  search() {
    this.listSearch = this.service.searching(this.keySearch);
  }

}
