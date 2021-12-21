/*
 * @Date: 2021-12-21 20:57:47
 * @LastEditTime: 2021-12-21 22:49:32
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

    @action FetchTodos(): TodoItem[] {
        provider.getInstance().get('/todo/').then((response: AxiosResponse) => {
            this.todoList = response.data;
            console.log(response.data);
            // console.log(this.todoList[0].id);
        }).catch(() => { message.error("???") })
        return this.todoList;
    }
}

const todoContext = new TodoContext();
export default todoContext;