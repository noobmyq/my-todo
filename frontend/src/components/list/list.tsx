/*
 * @Date: 2021-12-24 15:03:12
 * @LastEditTime: 2021-12-24 16:16:56
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/list/list.tsx
 */
import { Layout, List, Button, Typography, Drawer } from 'antd';
import todoContext from '../Todos';
import { TodoItem } from '../../constant/interface';
import { Component } from 'react'
const { Header, Content, Sider } = Layout

class TodoList extends Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    showStatus(item: TodoItem): string {
        if (item.status == 0) {
            return "todo";
        } else
            return "done";
    };
    filterTodo(allTodo: TodoItem[]): TodoItem[] {
        return allTodo.filter((item, index, array) => { return item.status == todoContext.showType; });
    }
    getTime(item: TodoItem): string {
        const dateStr = item.expire_date;
        console.log(dateStr);
        const date = new Date(Date.parse(dateStr));
        const dateStrShow = date.toLocaleDateString();
        console.log(dateStrShow);
        return dateStrShow;
    }
    render() {

        const wholeData = todoContext.todoList;
        const todoData = this.filterTodo(wholeData);
        return (<Content className='todoList'
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
            }}>
            <List
                itemLayout="horizontal"
                dataSource={todoData}
                renderItem={item =>
                    <List.Item actions={[
                        <Button onClick={() => {
                            todoContext.RemoveTodos(item)
                        }}>
                            删除
                        </Button>,
                        <Button onClick={() => {
                            todoContext.showDetails(item)
                        }}>
                            修改
                        </Button>,
                        <Button onClick={() => {
                            todoContext.MarkasDone(item)
                        }}>
                            完成
                        </Button>
                    ]}>
                        <List.Item.Meta
                            title={<div>{item.id}</div>}
                            description={this.getTime(item)}
                        />
                        <Typography.Text mark>[{this.showStatus(item)}] </Typography.Text>{item.content}

                    </List.Item>
                }
            />
            <Drawer
                title="update-item"
                placement='right'
                onClose={todoContext.closeDetails}
                visible={todoContext.detailVisable}
            >
                abc
            </Drawer>
        </Content>)
    }
}

export default TodoList