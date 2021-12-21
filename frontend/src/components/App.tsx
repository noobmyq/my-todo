/*
 * @Date: 2021-12-21 18:08:09
 * @LastEditTime: 2021-12-21 22:46:24
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/App.tsx
 */
import React, { Component } from 'react';
import './App.css';
import Header from "./Header"
import { observer } from "mobx-react";
import { Layout, List, Drawer } from 'antd';
import Todos from './Todos';
import TodoContext from './Todos';
import { TodoItem } from '../constant/interface';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
// default
@observer class Todo extends Component<any, { sortBy: string }> {
    constructor(props: any) {
        super(props);
        this.state = { sortBy: 'date', }
    };

    renderTodoListItem = (item: TodoItem) => {

        return (
            <List.Item>
                <List.Item.Meta
                    title={<div>{item.id + '  '}</div>}
                    description={item.item}
                />
            </List.Item>
        )
    };
    render() {
        let todoData = TodoContext.FetchTodos();
        console.log(todoData)
        return (<Layout>
            <Header />
            <div>
                {/* {todoData} */}
            </div>
            {/* {/* <Content className='todoList'>
                {todoData[0].title}
                {/* <List
                    itemLayout="vertical"
                    dataSource={todoData}
                    renderItem={item => this.renderTodoListItem(item)}
                ></List> </Content> * /*/}
        </Layout >
        )
    }

}
export default Todo;
