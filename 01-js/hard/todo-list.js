/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class TodoNode {
  constructor(task) {
    this.task = task;
    this.next = null;
  }
}
class Todo {
  constructor() {
    this.head = null;
  }

  add(task) {
    const newTodo = new TodoNode(task);
    if (this.head == null) {
      this.head = newTodo;
    } else {
      let current = this.head;

      while (current.next != null) {
        current = current.next;
      }
      current.next = newTodo;
    }
  }

  remove(indexOfTodo) {
    if (indexOfTodo === 0 && this.head !== null) { // Handle removing the head node
      this.head = this.head.next;
      return;
    }

    let k = 0;
    let current = this.head;
    let prevNode = null;

    while (current != null) {
      if (k === indexOfTodo) {
        if (prevNode != null) {
          prevNode.next = current.next;
        }
        return;
      }
      k++;
      prevNode = current;
      current = current.next;
    }
    if (current == null) {
      return;
    }
  }

  update(index, updatedTodo) {
    let k = 0;

    let current = this.head;

    while (current != null) {
      if (k === index) {
        current.task = updatedTodo;
        return;
      }
      k++;
      current = current.next;
    }

    return null;
  }

  getAll() {
    let TODO_LSIT = [];
    let current = this.head;

    while (current != null) {
      TODO_LSIT.push(current.task);
      current = current.next;
    }

    return TODO_LSIT;
  }

  get(indexOfTodo) {
    let k = 0;
    let current = this.head;

    while (current != null) {
      if (k == indexOfTodo) {
        return current.task;
      }
      k++;
      current = current.next;
    }

    return null;
  }

  clear() {
    this.head = null;
  }
}

module.exports = Todo;
