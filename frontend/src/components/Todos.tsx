/*
 * @Date: 2021-12-21 20:57:47
 * @LastEditTime: 2021-12-22 21:20:59
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/Todos.tsx
 */
import { action, observable } from 'mobx'
import React, { useEffect, useState } from "react";
import { Stack } from "@chakra-ui/core";
import { TodoItem } from "../constant/interface";
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { isAsExpression } from "typescript";
import { observer } from 'mobx-react-lite';
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

        provider.getInstance().delete('/items/clear')
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