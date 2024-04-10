import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  newTodoText: string = '';
  todos: { text: string, editing: boolean, completed: boolean }[] = [];

  addTodo() {
    if (this.newTodoText.trim() != '') {
      this.addToDoIfNotExist(this.newTodoText);
      this.newTodoText = '';
    }
  }

  addToDoIfNotExist(newTodo: string) {
    if (!this.todos.find(todo => todo.text === newTodo)) {
      this.todos.push({ text: newTodo, editing: false, completed: false });
    } else {
      console.error(`'${newTodo}' Already exists, Rejected`)
    }
  }

  completed(todo: { text: string, editing: boolean, completed: boolean }) {
    todo.completed = true;
  }

  edit(todo: { text: string, editing: boolean, completed: boolean }) {
    todo.editing = true;
  }

  saveEdit(todo: { text: string, editing: boolean, completed: boolean }){
    console.log(todo.text);
    
    todo.editing = false;
  }

  delete(todo: { text: string, editing: boolean, completed: boolean }){
    const index = this.todos.indexOf(todo);

    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }
}



