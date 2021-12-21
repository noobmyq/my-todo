/*
 * @Date: 2021-12-21 18:08:09
 * @LastEditTime: 2021-12-21 19:39:01
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/App.tsx
 */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./Header"
import { observer } from "mobx-react";
import { ThemeProvider } from 'emotion-theming';
import { Layout } from 'antd';


// default
@observer class Todo extends Component<any, { sortBy: string }> {
    constructor(props: any) {
        super(props);
        this.state = { sortBy: 'date', }
    };
    render(): any {
        return (<Layout>
            {/* <Layout.Header className='todo-headers'>
                Todo List:
        </Layout.Header>*/}
            <Header />
            <Layout.Content>
                hello
            </Layout.Content>
        </Layout>
        )
    }

}
export default Todo;
