/*
 * @Date: 2021-12-21 18:08:09
 * @LastEditTime: 2021-12-25 16:50:39
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/App.tsx
 */
import { Component } from 'react';
import './App.css';
// import Header from "./Header"
import { observer } from "mobx-react";
import { FormInstance, Layout } from 'antd';
import todoContext from './Todos';
import { TodoItem } from '../constant/interface';
import Category from './sider/category'
import CreateTodos from './create/create';
import TodoList from './list/list';
const { Header, Content, Sider } = Layout
// default
@observer class Todo extends Component<any, { time: string }> {

    constructor(props: any) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString()
        }
    };
    // use to refresh
    componentDidMount() {
        setInterval(() => {
            this.setState({ time: new Date().toLocaleTimeString() })
        }, 1000);
    }

    filterTodo(allTodo: TodoItem[]): TodoItem[] {
        return allTodo.filter((item, index, array) => { return item.status == todoContext.showType; });
    }

    render() {
        const wholeData = todoContext.ShowTodos();
        const todoData = this.filterTodo(wholeData);
        // console.log("apps render")
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
