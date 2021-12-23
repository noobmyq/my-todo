/*
 * @Date: 2021-12-21 20:57:47
 * @LastEditTime: 2021-12-23 21:06:28
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/Todos.tsx
 */
import { action, observable } from 'mobx'
import { TodoItem } from "../constant/interface";
import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { message } from 'antd';

class Provider {
    getInstance(): AxiosInstance {
        return axios.create({ baseURL: 'http://127.0.0.1:8000' });
    }
}
const provider = new Provider();
class TodoContext {
    @observable todoList: TodoItem[] = [];
    @observable numofItems: number = 0;
    @observable detailVisable: boolean = false;
    @observable editingItem: TodoItem | any = 0;

    @action closeDetails(): void {
        this.detailVisable = false;
        this.editingItem = 0
    }
    @action showDetails(item: TodoItem): void {
        this.detailVisable = true;
        this.editingItem = item
        console.log(this.detailVisable)
    }
    @action MarkasDone(item: TodoItem): void {
        const id: Number = item.id;
        provider.getInstance().patch(`/todo/${id}/done`, id)
            .then(() => {
                this.FetchTodos();
            }).catch(() => { message.error("完成失败") })
    }
    @action UpdateTodos(item: TodoItem): void {
        console.log(item);
        const id: Number = item.id;
        const update_item = {
            content: item.content,
            status: item.status
        }
        provider.getInstance().patch('/items/' + id.toString(), update_item)
            .then(() => {
                this.FetchTodos();
            }).catch(() => { message.error("更新失败") })

    }
    @action RemoveTodos(item: TodoItem): void {
        console.log(item);
        const id: Number = item.id;
        provider.getInstance().delete('/items/' + id.toString())
            .then(() => {
                this.FetchTodos();
                this.numofItems = this.numofItems - 1;
            }).catch(() => { message.error("删除失败") })
    }
    @action ClearTodos(): void {
        provider.getInstance().delete('/clear')
            .then(() => {
                this.FetchTodos();
                this.numofItems = 0;
            }).catch(() => { message.error("清空失败") })
    }
    @action AddTodos(item: TodoItem): void {
        console.log(item);
        const json = JSON.parse(JSON.stringify(item));
        console.log(json);
        provider.getInstance().post('/todo/', json)
            .then(() => {
                this.FetchTodos();
                this.numofItems = this.numofItems + 1;
            }).catch(() => { message.error('创建失败') })

    }
    @action FetchTodos(): TodoItem[] {
        provider.getInstance().get('/todo/').then((response: AxiosResponse) => {
            this.todoList = response.data;
            console.log(this.todoList)
            // console.log(this.todoList[0].id);
        }).catch(() => { message.error("???") })
        return this.todoList;
    }
}

const todoContext = new TodoContext();
export default todoContext;