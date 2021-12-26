/*
 * @Date: 2021-12-24 15:03:12
 * @LastEditTime: 2021-12-26 15:27:16
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/list/list.tsx
 */
import { Layout, List, Button, Typography, Radio, RadioChangeEvent } from 'antd';
import todoContext from '../Todos';
import { TodoItem, TodoSort, TodoStatus } from '../../constant/interface';
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
    showStatus(item: TodoItem) {
        switch (item.status) {
            case TodoStatus.TODO:
                return "Todo";
                break;
            case TodoStatus.DONE:
                return "Done";
                break;
            case TodoStatus.EXPIRED:
                return "Expired";
                break;
        }
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
        if (item.status != TodoStatus.TODO) return true;
        // this.testing();
        return false;
    }
    doneButtonDiabled(item: TodoItem) {
        if (item.status != TodoStatus.TODO) return true;
        // this.testing();
        return false;
    }
    getImage(): string {
        const showType = todoContext.showType;
        var URL: string = "";
        switch (showType) {
            case TodoStatus.TODO:
                URL = "http://127.0.0.1:8001/assets/picture/mnn.png"
                break;
            case TodoStatus.DONE:
                URL = "http://127.0.0.1:8001/assets/picture/mnn1.png"
                break;
            case TodoStatus.EXPIRED:
                URL = "http://127.0.0.1:8001/assets/picture/mnn2.png"
                break;
        }
        return URL;

    }
    render() {
        const todoData = this.filterTodo(todoContext.ShowTodos());
        // const imageURL = "http://127.0.0.1:8001/assets/picture/mnn.png"
        const imageURL = this.getImage();
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