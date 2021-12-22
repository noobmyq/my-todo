/*
 * @Date: 2021-12-21 18:08:09
 * @LastEditTime: 2021-12-22 10:09:54
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/App.tsx
 */
import React, { Component } from 'react';
import './App.css';
import Header from "./Header"
import { observer } from "mobx-react";
import { Layout, List, Drawer, Row } from 'antd';
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

    render() {
        const todoData = TodoContext.FetchTodos();
        console.log(todoData[0])
        return (<Layout>
            <Header />
            <div>
                {/* {todoData} */}
            </div>
            <Content className='todoList'>
                <Row>
                    <List
                        itemLayout="vertical"
                        dataSource={todoData}
                        renderItem={item =>
                            <List.Item>
                                <List.Item.Meta
                                    title={<div>{item.id}</div>}
                                    description={item.item}
                                />
                            </List.Item>
                        }
                    ></List>
                </Row>
            </Content>
        </Layout >
        )
    }

}
export default Todo;
