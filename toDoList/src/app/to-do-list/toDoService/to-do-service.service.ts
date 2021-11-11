import {Injectable} from '@angular/core';
import {TODO} from "../Model/TODO";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToDoServiceService {

  private readonly LOCAL_STORAGE_KEY = 'todoList';
  private todoArr = this.getLocalStorageList();
  private todoList$ = new BehaviorSubject<TODO[]>(this.todoArr);
  // @ts-ignore
  public addItem = (newItem: TODO) => this.todoArr.unshift(newItem) && this.todoList$.next(this.todoArr);
  public getToDoList = () => this.todoList$;
  public search = () => this.todoList$;

  constructor() {
    this.todoList$.subscribe(this.listChanged.bind(this));
  }

  listChanged(): void {
    if (this.todoArr.length) {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.todoArr));
    }
  }

  searching(key: string): TODO[] {

    let ret = [];
    let arr = [];
    const localStorageStr = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (key === '' && localStorageStr) {
      ret = JSON.parse(localStorageStr);
    } else {
      if (localStorageStr) {
        arr = JSON.parse(localStorageStr);
        for (let i = arr.length - 1; i >= 0; i--) {
          if (arr.includes(key)) {
            ret.unshift(arr[i]);
          }
        }
        ret = ret.sort((a: TODO, b: TODO) => {
          let time1 = new Date(a.dueDate).getTime();
          let time2 = new Date(b.dueDate).getTime();

          if (time1 > time2) {
            return -1;
          } else {
            return 0;
          }
        });
      }
    }


    return ret;
  }

  getLocalStorageList(): TODO[] {
    let ret = [];
    const localStorageStr = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (localStorageStr) {
      ret = JSON.parse(localStorageStr);
      // ret = ret.sort((a: TODO, b: TODO) => a.dueDate > b.dueDate ? -1 : 1);
      ret = ret.sort((a: TODO, b: TODO) => {
        let time1 = new Date(a.dueDate).getTime();
        let time2 = new Date(b.dueDate).getTime();

        if (time1 > time2) {
          return -1;
        } else {
          return 0;
        }
        // a.dueDate > b.dueDate ? -1 : 1
      });
      console.log(ret);
    }
    return ret;
  }

  removeItem(itemToRemove: TODO | any) {
    const itemToRemoveIndex = this.todoArr.findIndex(item => item === itemToRemove);
    if (itemToRemoveIndex > -1) {
      this.todoArr.splice(itemToRemoveIndex, 1);
      this.todoList$.next(this.todoArr);
    }
  }

  removeMultiItem(mulItem: TODO[]) {
    for (let i = this.todoArr.length - 1; i >= 0; i--) {
      this.removeItem(mulItem[i]);
    }

  }

}
