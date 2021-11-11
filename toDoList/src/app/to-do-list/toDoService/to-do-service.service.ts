import {Injectable} from '@angular/core';
import {TODO} from "../Model/TODO";

@Injectable({
  providedIn: 'root'
})
export class ToDoServiceService {

  readonly LOCAL_STORAGE_KEY = 'todoList';
  private todoArr = this.getLocalStorageList();

  constructor() {
  }


  deleteItem(itemToRemove: TODO) {
    this.todoArr = this.getLocalStorageList();
    const itemToRemoveIndex = this.todoArr.findIndex(item => item.id == itemToRemove.id);
    if (itemToRemoveIndex > -1) {
      this.todoArr.splice(itemToRemoveIndex, 1);
      localStorage.removeItem('this.LOCAL_STORAGE_KEY');
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.todoArr));
    }
  }


  searching(key: string): TODO[] {
    let ret = [];
    let arr = [];
    const localStorageStr = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (key === '') {
      if (localStorageStr != null) {
        ret = JSON.parse(localStorageStr);
      }
    } else {
      if (localStorageStr) {
        arr = JSON.parse(localStorageStr);

        for (let i = arr.length - 1; i >= 0; i--) {
          if (arr[i].title.includes(key)) {

            ret.unshift(arr[i]);
          }
        }
        ret = ret.sort((a: TODO, b: TODO) => {
          let time1 = new Date(a.dueDate).getTime();
          let time2 = new Date(b.dueDate).getTime();

          if (time1 < time2) {
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
      ret = ret.sort((a: TODO, b: TODO) => {
        let time1 = new Date(a.dueDate).getTime();
        let time2 = new Date(b.dueDate).getTime();

        if (time1 < time2) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    return ret;
  }

}
