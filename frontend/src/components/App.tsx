/*
 * @Date: 2021-12-21 18:08:09
 * @LastEditTime: 2021-12-24 16:18:32
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/App.tsx
 */
import { Component } from 'react';
import './App.css';
// import Header from "./Header"
import { observer } from "mobx-react";
import { Layout } from 'antd';
import todoContext from './Todos';
import { TodoItem } from '../constant/interface';
import Category from './sider/category'
import CreateTodos from './create/create';
import TodoList from './list/list';
const { Header, Content, Sider } = Layout
// default
@observer class Todo extends Component<any, { sortBy: string }> {
    constructor(props: any) {
        super(props);
        this.state = { sortBy: 'date' }
    };
    filterTodo(allTodo: TodoItem[]): TodoItem[] {
        return allTodo.filter((item, index, array) => { return item.status == todoContext.showType; });
    }

    render() {
        const wholeData = todoContext.todoList;
        const todoData = this.filterTodo(wholeData);
        // console.log(wholeData)
        // console.log(todoContext.showType)
        return (
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Category />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <CreateTodos />
                    <TodoList />
                </Layout>
            </Layout >
        );
    }

}
export default Todo;
