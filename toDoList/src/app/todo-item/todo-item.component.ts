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
  @Output()
  readonly addEvent = new EventEmitter<TODO>();
  @Input() TODOItem: TODO | undefined;
  btnStatus: boolean = false;

  constructor(private todoService: ToDoServiceService) {
  }

  ngOnInit(): void {
    if (this.TODOItem == undefined) {
      this.btnStatus = true;
      this.selectedTODO = new TODO('', '', new Date().toDateString(), 'Normal');
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
    this.todoService.removeItem(this.TODOItem);
    this.selectedTODO = clone;
    this.add();
  }

  public add() {
    if (this.selectedTODO.title) {

      this.todoService.addItem(this.selectedTODO);
      this.selectedTODO = new TODO('', '', new Date().toDateString(), 'Normal');
      if (this.addEvent) {
        this.addEvent.emit(this.selectedTODO);
      }

    }
  }
}
