import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  newTodoText: string = '';
  todos: { text: string, editing: boolean, completed: boolean, time: string }[] = [];
  newTodoTime: string = '';

  addTodo() {
    console.log(this.newTodoTime);

    if (this.newTodoText.trim() != '') {
      this.addToDoIfNotExist(this.newTodoText, this.newTodoTime);
      this.newTodoText = '';
      this.newTodoTime = '';
    }
  }

  addToDoIfNotExist(newTodo: string, newTodoTime: string) {
    if (!this.todos.find(todo => todo.text === newTodo)) {
      this.todos.push({ text: newTodo, editing: false, completed: false, time: this.newTodoTime });
    } else {
      console.error(`'${newTodo}' Already exists, Rejected`)
    }
  }

  completed(todo: { text: string, editing: boolean, completed: boolean, time: string }) {
    todo.completed = true;
  }

  edit(todo: { text: string, editing: boolean, completed: boolean, time: string }) {
    todo.editing = true;
  }

  saveEdit(todo: { text: string, editing: boolean, completed: boolean, time: string }) {
    console.log(todo.text);

    todo.editing = false;
  }

  delete(i: number) {
    this.todos.splice(i, 1);
  }

  markAsIncomplete(todo: { text: string, editing: boolean, completed: boolean, time: string }) {
    todo.completed = false;
  }

}