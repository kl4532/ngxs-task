import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { AppService } from './app.service';

export interface CreateTodoBody {
  title: string;
}

@Controller('todos')
export class AppController {
  // create, read, update, delete

  // GET /todos --> all todos
  // GET /todos/:id --> details todo
  // PUT /todos/:id --> update todo
  // DELETE /todos/:id --> delete todo
  // POST /todos --> create todo

  constructor(private readonly appService: AppService) {}

  @Get()
  getAll() {
    return this.appService.getAll();
  }

  @Get(':id')
  getTodoById(@Param('id') id: string) {
    const numId = +id;
    return this.appService.getById(numId);
  }

  @Post()
  create(@Body() body: CreateTodoBody) {
    return this.appService.create(body);
  }

  @Put(':id')
  updateTodo(@Param('id') id: string, @Body() body: CreateTodoBody) {
    const numId = +id;
    return this.appService.updateTodo(numId, body);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    const numId = +id;
    return this.appService.deleteTodo(numId);
  }

}
