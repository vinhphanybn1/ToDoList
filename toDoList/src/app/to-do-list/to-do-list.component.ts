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
  toDoList$: TODO[] = this.service.getLocalStorageList();
  listSelected: TODO[] = [];
  details: boolean[] = [];
  keySearch: string = '';


  constructor(private service: ToDoServiceService) {
  }

  ngOnInit(): void {
    this.listSelected = [];
    this.toDoList$ = this.service.getLocalStorageList();
  }

  listenEventAdd(event: any) {
    if (event == true) {
      this.toDoList$ = this.service.getLocalStorageList();
    }
  }

  deleteItem(itemToRemove: TODO) {
    this.service.deleteItem(itemToRemove);
    this.toDoList$ = this.service.getLocalStorageList();
  }

  deleteMultiItem(itemToRemove: TODO[]) {

    for (let i = itemToRemove.length - 1; i >= 0; i--) {
      this.deleteItem(itemToRemove[i]);
    }
    this.listSelected = [];
    this.toDoList$ = this.service.getLocalStorageList();
  }

  addListSelected(event: any, itemSelected: TODO) {
    if (event.target.checked) {
      this.listSelected.unshift(itemSelected);
    } else {
      const index = this.listSelected.findIndex(item => item.id == itemSelected.id);
      if (index > -1) {
        this.listSelected.splice(index, 1);
      }
    }

  }

  ngOnChanges(): void {
    this.toDoList$ = this.service.getLocalStorageList();
  }

  search(key: string) {
    // @ts-ignore
    this.toDoList$ = this.service.searching(key);
  }

}
