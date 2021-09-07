1) Install a filter that calls up and displays all completed or open todos via @Select from the store.
You should be able to control which one you want to see via a button (e.g. "show all completed todos", "show all open todos").
See: https://www.ngxs.io/concepts/select

2) Build a Todo CRUD service that simulates a service to an endpoint. That means there should be the following methods:
getTodos (): Observable <Todo []> -> Gives you all todos back
updateTodo (todo: Todo): Observable <Todo> -> Updates a todo and returns the new, modified todo
deleteTodo (id: number): Observable <void> -> Deletes a todo
createTodo (title: string): Observable <Todo> -> Creates a todo and returns it.

The service should only simulate access to a backend. Saves the todos for test purposes in an array within the service.

3) Rebuild your state so that it carries out all operations with the help of the service. This means that the createTodo method should be used when creating a todo.
If she gives something back, this new todo should be included in the state.
See: https://www.ngxs.io/concepts/state#async-actions
Try to solve that. If you have any questions, I am available to you in writing. Have fun and good luck. You are also very welcome to work on it in a team. You can use this for this: https://meet.diamirholding.com/
