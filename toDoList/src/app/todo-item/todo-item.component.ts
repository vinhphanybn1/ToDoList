import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TODO} from "../to-do-list/Model/TODO";
import {ToDoServiceService} from "../to-do-list/toDoService/to-do-service.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  selectedTODO: TODO | any;
  errorInput: string = '';
  listTODO: TODO[] = [];
  @Output() addEvent = new EventEmitter<boolean>();
  @Input() TODOItem: TODO | undefined;
  btnStatus: boolean = false;

  constructor(private todoService: ToDoServiceService) {
  }

  ngOnInit(): void {
    this.listTODO = this.todoService.getLocalStorageList();
    if (this.TODOItem == undefined) {
      this.btnStatus = true;
      let r = (Math.random() + 1).toString(36).substring(7);
      this.selectedTODO = new TODO(r, '', '', new Date().toDateString(), 'Normal');
    } else {
      this.btnStatus = false;
      this.selectedTODO = this.TODOItem;
    }
  }

  dateChanged(eventDate: string): any | null {
    return !!eventDate ? new Date(eventDate).toDateString() : null;
  }

  edit(item: any) {
    const clone = JSON.parse(JSON.stringify(item));
    this.todoService.deleteItem(item);
    this.selectedTODO = clone;
    this.add(item);
    this.selectedTODO = clone;
  }

  public add(item: TODO) {

    this.listTODO = this.todoService.getLocalStorageList();
    if (this.selectedTODO.title) {
      if (new Date(this.selectedTODO.dueDate).getDate() >= new Date().getDate()) {
        this.listTODO.unshift(item);
        if (this.listTODO.length) {
          localStorage.removeItem(this.todoService.LOCAL_STORAGE_KEY);
          localStorage.setItem(this.todoService.LOCAL_STORAGE_KEY, JSON.stringify(this.listTODO));
        }
        let r = (Math.random() + 1).toString(36).substring(7);
        this.selectedTODO = new TODO(r, '', '', new Date().toDateString(), 'Normal');
        this.errorInput = '';
        this.addEvent.emit(true);

      } else {
        this.errorInput = 'duedate is less than now'
      }


    } else {
      this.errorInput = 'Invalid title'
    }
  }
}
