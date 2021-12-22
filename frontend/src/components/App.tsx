/*
 * @Date: 2021-12-21 18:08:09
 * @LastEditTime: 2021-12-22 16:55:26
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/App.tsx
 */
import React, { Component, FormEvent, FormEventHandler } from 'react';
import './App.css';
import Header from "./Header"
import { observer } from "mobx-react";
import { Layout, List, Row, Form, Button, Select } from 'antd';
import TodoContext from './Todos';
import { TodoItem } from '../constant/interface';
import todoContext from './Todos';


// default
@observer class Todo extends Component<any, { sortBy: string }> {
    constructor(props: any) {
        super(props);
        this.state = { sortBy: 'date', }
    };
    submit(e: FormEvent) {
        const newTodo: TodoItem = {
            id: todoContext.numofItems,
            content: "New item"
        }
        TodoContext.AddTodos(newTodo);
    }
    render() {
        const todoData = TodoContext.FetchTodos();
        console.log(todoData[0])
        return (<Layout>
            <Header />
            <div className='create-item'>
                <Form layout="inline" onClick={this.submit}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" >
                            创建
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='todoList'>
                <Row>
                    <List
                        itemLayout="vertical"
                        dataSource={todoData}
                        renderItem={item =>
                            <List.Item>
                                <List.Item.Meta
                                    title={<div>{item.id}</div>}
                                    description={item.content}
                                />
                            </List.Item>
                        }
                    ></List>
                </Row>
            </div>
        </Layout >
        )
    }

}
export default Todo;
