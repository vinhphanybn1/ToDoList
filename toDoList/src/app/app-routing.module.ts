import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ToDoListComponent} from "./to-do-list/to-do-list.component";
import {TodoItemComponent} from "./todo-item/todo-item.component";

const routes: Routes = [
  {
    path: '', pathMatch: 'full'
    , redirectTo: '/todoList'
  },
  {
    path: 'todo',
    component: TodoItemComponent,
  }, {
    path: 'todoList',
    component: ToDoListComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
