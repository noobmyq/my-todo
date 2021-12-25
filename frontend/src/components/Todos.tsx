/*
 * @Date: 2021-12-21 20:57:47
 * @LastEditTime: 2021-12-25 16:31:30
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/Todos.tsx
 */
import { action, observable } from 'mobx'
import { TodoItem, TodoStatus } from "../constant/interface";
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { message } from 'antd';
import moment from 'moment';

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
    @observable showType: number = 0;

    @action checkExpired(): void {
        for (var i = 0; i < this.todoList.length; i++) {
            if (moment(this.todoList[i].expire_date) < moment(new Date())) {
                this.todoList[i].status = 2;
                this.expireItem(this.todoList[i].id);
            }
        }
        this.FetchTodos();
    }
    @action expireItem(item_id: Number): void {
        provider.getInstance().patch(`/todo/${item_id}/` + TodoStatus.EXPIRED.toString())
            .then(() => {
                this.FetchTodos();
            }).catch(() => { message.error("过期标记失败") })
    }
    @action closeDetails = (e: any): void => {
        this.detailVisable = false;
        this.editingItem = 0;
        this.FetchTodos();
    }
    @action showDetails(item: TodoItem): void {
        this.detailVisable = true;
        this.editingItem = item
        this.FetchTodos();
        console.log(this.detailVisable)
    }
    @action MarkasDone(item: TodoItem): void {
        const id: Number = item.id;
        provider.getInstance().patch(`/todo/${id}/` + TodoStatus.DONE.toString())
            .then(() => {
                this.FetchTodos();
            }).catch(() => { message.error("标记完成失败") })
    }
    @action UpdateTodos(item: TodoItem): void {
        console.log(item);
        const id: Number = this.editingItem.id;
        const update_item: TodoItem = {
            id: id,
            content: item.content,
            status: item.status,
            expire_date: item.expire_date,
            title: item.title,
            priority: item.priority
        }

        const json = JSON.parse(JSON.stringify(update_item));
        provider.getInstance().patch('/todo/' + id.toString(), json)
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
        const json = JSON.parse(JSON.stringify(item));
        provider.getInstance().post('/todo/', json)
            .then(() => {
                this.FetchTodos();
                this.numofItems = this.numofItems + 1;
            }).catch(() => { message.error('创建失败') })

    }
    @action FetchTodos = (): void => {
        provider.getInstance().get('/todo/').
            then((response: AxiosResponse) => {
                this.todoList = response.data;
            }).catch(() => { message.error("???") })
    }
    @action ShowTodos(): TodoItem[] {
        this.FetchTodos();
        this.checkExpired();
        return this.todoList;
    }
}

const todoContext = new TodoContext();
export default todoContext;