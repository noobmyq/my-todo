/*
 * @Date: 2021-12-21 18:08:09
 * @LastEditTime: 2021-12-21 20:14:31
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/App.tsx
 */
import React, { Component } from 'react';
import './App.css';
import Header from "./Header"
import { observer } from "mobx-react";
import { Layout } from 'antd';


// default
@observer class Todo extends Component<any, { sortBy: string }> {
    constructor(props: any) {
        super(props);
        this.state = { sortBy: 'date', }
    };
    render(): any {
        return (<Layout>
            <Header />
            <Layout.Content>
                hello
            </Layout.Content>
        </Layout>
        )
    }

}
export default Todo;
