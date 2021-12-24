/*
 * @Date: 2021-12-24 15:03:12
 * @LastEditTime: 2021-12-24 17:35:35
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/list/list.tsx
 */
import { Layout, List, Button, Typography, Drawer } from 'antd';
import todoContext from '../Todos';
import { TodoItem } from '../../constant/interface';
import { Component } from 'react'
import { getPriority } from 'os';
const { Header, Content, Sider } = Layout

class TodoList extends Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    showStatus(item: TodoItem): string {
        if (item.status == 0) {
            return "Todo";
        } else
            return "Done";
    };
    filterTodo(allTodo: TodoItem[]): TodoItem[] {
        return allTodo.filter((item, index, array) => { return item.status == todoContext.showType; });
    }
    getTime(item: TodoItem): string {
        const dateStr = item.expire_date;
        console.log(dateStr);
        const date = new Date(Date.parse(dateStr));
        const dateStrShow = date.toLocaleString();
        console.log(dateStrShow);
        return dateStrShow;
    }
    getPriority(item: TodoItem): string {
        const priority = item.priority;
        let priorityStr: string = "";
        switch (priority) {
            case 1:
                priorityStr = "优先级1";
                break;
            case 2:
                priorityStr = "优先级2";
                break;
            case 3:
                priorityStr = "优先级3";
                break;
        }
        return priorityStr
    }
    editButtonDisabled(item: TodoItem) {
        if (item.status != 1) return false;
        return true;
    }
    doneButtonDiabled(item: TodoItem) {
        if (item.status == 1) return true;
        return false;
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
                        <Button disabled={this.editButtonDisabled(item)} onClick={() => {
                            todoContext.showDetails(item)
                        }}>
                            修改
                        </Button>,
                        <Button disabled={this.doneButtonDiabled(item)} onClick={() => {
                            todoContext.MarkasDone(item)
                        }}>
                            完成
                        </Button>
                    ]}>
                        <List.Item.Meta
                            title={<div>标题： {item.title}</div>}
                            description={<div>到期时间:  {this.getTime(item)} <div> 优先级: {this.getPriority(item)}</div></div>}
                        />
                        <Typography.Text mark style={{ fontSize: 20 }}>({this.showStatus(item)}) </Typography.Text>  {item.content}

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