/*
 * @Date: 2021-12-21 20:57:47
 * @LastEditTime: 2021-12-26 10:57:23
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/Todos.tsx
 */
import { TodoItem, TodoSort, TodoStatus } from "../constant/interface";
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
    todoList: TodoItem[] = [];
    numofItems: number = 0;
    detailVisable: boolean = false;
    editingItem: TodoItem | any = 0;
    showType: number = 0;
    sortType: number = TodoSort.BYCREATEDATE;

    checkExpired(): void {
        for (var i = 0; i < this.todoList.length; i++) {
            if (moment(this.todoList[i].expire_date) < moment(new Date())) {
                this.todoList[i].status = 2;
                this.expireItem(this.todoList[i].id);
            }
        }
        this.FetchTodos();
    }
    sortBy(critiria: number): void {
        switch (critiria) {
            case TodoSort.BYCREATEDATE:
                this.todoList.sort((a, b) => { return a.id - b.id })
                break;
            case TodoSort.BYEXPIREDATE:
                this.todoList.sort((a, b) => { return (Date.parse(a.expire_date) - Date.parse(b.expire_date)) })
                break;
            case TodoSort.BYPRIORITY:
                this.todoList.sort((a, b) => { return a.priority - b.priority })
                break;
        }
        this.sortType = critiria
    }
    expireItem(item_id: Number): void {
        provider.getInstance().patch(`/todo/${item_id}/` + TodoStatus.EXPIRED.toString())
            .then(() => {
                this.FetchTodos();
            }).catch(() => { message.error("过期标记失败") })
    }
    closeDetails = (e: any): void => {
        this.detailVisable = false;
        this.editingItem = 0;
        this.FetchTodos();
    }
    showDetails(item: TodoItem): void {
        this.detailVisable = true;
        this.editingItem = item
        this.FetchTodos();
        console.log(this.detailVisable)
    }
    MarkasDone(item: TodoItem): void {
        const id: Number = item.id;
        provider.getInstance().patch(`/todo/${id}/` + TodoStatus.DONE.toString())
            .then(() => {
                this.FetchTodos();
            }).catch(() => { message.error("标记完成失败") })
    }
    UpdateTodos(item: TodoItem): void {
        console.log(item);
        const id: number = this.editingItem.id;
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
    RemoveTodos(item: TodoItem): void {
        console.log(item);
        const id: Number = item.id;
        provider.getInstance().delete('/items/' + id.toString())
            .then(() => {
                this.FetchTodos();
                this.numofItems = this.numofItems - 1;
            }).catch(() => { message.error("删除失败") })
    }
    ClearTodos(): void {
        provider.getInstance().delete('/clear')
            .then(() => {
                this.FetchTodos();
                this.numofItems = 0;
            }).catch(() => { message.error("清空失败") })
    }
    AddTodos(item: TodoItem): void {
        const json = JSON.parse(JSON.stringify(item));
        provider.getInstance().post('/todo/', json)
            .then(() => {
                this.FetchTodos();
                this.numofItems = this.numofItems + 1;
            }).catch(() => { message.error('创建失败') })

    }
    FetchTodos = (): void => {
        provider.getInstance().get('/todo/').
            then((response: AxiosResponse) => {
                this.todoList = response.data;
                this.sortBy(this.sortType)
            }).catch(() => { message.error("???") })
    }
    ShowTodos(): TodoItem[] {
        this.FetchTodos();
        this.checkExpired();
        return this.todoList;
    }
}

const todoContext = new TodoContext();
export default todoContext;