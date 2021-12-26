/*
 * @Date: 2021-12-24 15:03:12
 * @LastEditTime: 2021-12-26 14:38:18
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/list/list.tsx
 */
import { Layout, List, Button, Typography, Radio, RadioChangeEvent } from 'antd';
import todoContext from '../Todos';
import { TodoItem, TodoSort } from '../../constant/interface';
import { Component } from 'react'
import '../App.css';
import DrawerTodos from '../drawer/drawer';
const { Header, Content, Sider } = Layout

class TodoList extends Component<any, { time: string }> {
    constructor(props: any) {
        super(props);
        this.state = { time: new Date().toLocaleTimeString() }
    }
    sortBy(e: RadioChangeEvent): void {
        todoContext.sortBy(e.target.value);
    }
    // // use to refresh
    componentDidMount() {
        setInterval(() => {
            this.setState({ time: new Date().toLocaleTimeString() })
        }, 1000);
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
        const date = new Date(Date.parse(dateStr));
        const dateStrShow = date.toLocaleString();
        return dateStrShow;
    }
    editButtonDisabled(item: TodoItem) {
        if (item.status != 1) return false;
        // this.testing();
        return true;
    }
    doneButtonDiabled(item: TodoItem) {
        if (item.status == 1) return true;
        // this.testing();
        return false;
    }
    render() {
        const todoData = this.filterTodo(todoContext.ShowTodos());
        // const imageURL = "file:///home/myq/program/new-simple-todo/my-todo/frontend/assets/picture/mnn.jpg"
        const imageURL = "http://127.0.0.1:8001/assets/picture/mnn.png"
        console.log(imageURL)
        return (<Content className='todoList'
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
            }}>
            <Radio.Group defaultValue={todoContext.sortType} onChange={this.sortBy}>
                <Radio.Button value={TodoSort.BYCREATEDATE}>按创建日期排序</Radio.Button>
                <Radio.Button value={TodoSort.BYEXPIREDATE}>按到期日期排序</Radio.Button>
                <Radio.Button value={TodoSort.BYPRIORITY}>按优先级排序</Radio.Button>
            </Radio.Group>
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
                        <Layout>
                            <Sider style={{ width: 100, height: 100 }} width={100}>
                                <img
                                    style={{ width: 100, height: 100 }}
                                    src={imageURL}
                                />
                            </Sider>
                            <Content>
                                < List.Item.Meta
                                    style={{ width: 500 }}
                                    title={<div>标题： {item.title}</div>}
                                    description={<div>到期时间:  {this.getTime(item)} <div> 优先级: {item.priority}</div></div>}
                                />
                                <Typography.Text mark style={{ fontSize: 20 }}>({this.showStatus(item)}) </Typography.Text>  {item.content}
                            </Content>
                        </Layout>

                    </List.Item>
                }
            />
            < DrawerTodos />
        </Content >)
    }
}

export default TodoList