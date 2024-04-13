import { Component } from '@angular/core';

type todoType = { text: string, editing: boolean, completed: boolean, completeBy: string, inProgress: boolean };
let TodoDef: todoType = { text: "", editing: false, completed: false, completeBy: "", inProgress: false }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  newTodoText: string = '';
  todos: todoType[] = [];
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
      let todo: todoType = TodoDef;
      todo.text = this.newTodoText;
      if (newTodo.length > 0) {
        todo.completeBy = newTodoTime;
      }
      this.startTimer(todo);
      this.todos.push(todo);
    } else {
      console.error(`'${newTodo}' Already exists, Rejected`)
    }
  }

  completed(todo: todoType) {
    todo.completed = true;
  }

  edit(todo: todoType) {
    todo.editing = true;
  }

  saveEdit(todo: todoType) {
    console.log(todo.text);

    todo.editing = false;
  }

  delete(i: number) {
    this.todos.splice(i, 1);
  }

  markAsIncomplete(todo: todoType) {
    todo.completed = false;
  }

  startTimer(todo: todoType) {
    const timeInput = this.newTodoTime;
    const currentTime = new Date();
    let timeFormat = JSON.stringify(currentTime).substring(1, 12);
    const inputTime = new Date(`${timeFormat}${timeInput}`);

    const timeDiff = inputTime.getTime() - currentTime.getTime();

    console.log(inputTime);
    console.log(timeDiff);
    if (timeDiff <= 0) {
      console.error("enter a time in future")
    }


    const timerInterval = setInterval(function () {
      const currentTime = new Date();
      const remainingTime = inputTime.getTime() - currentTime.getTime();
      if (todo.completed || remainingTime <= 0) {
        clearInterval(timerInterval);
        if (todo.completed) {
          todo.completeBy = "";
        } else {
          todo.completeBy = "Delayed";
        }
      } else {
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);

        console.log(`Time left: ${hours}h ${minutes}m ${seconds}s`);

        todo.completeBy = `Complete by ${hours}h ${minutes}m ${seconds}s`;

      }
    }, 1000)

  }

}