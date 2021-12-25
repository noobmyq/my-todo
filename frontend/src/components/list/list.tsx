/*
 * @Date: 2021-12-24 15:03:12
 * @LastEditTime: 2021-12-25 17:25:47
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/list/list.tsx
 */
import { Layout, List, Button, Typography } from 'antd';
import todoContext from '../Todos';
import { TodoItem } from '../../constant/interface';
import '../App.css';
import DrawerTodos from '../drawer/drawer';
const { Header, Content, Sider } = Layout

const TodoList: React.FC = () => {
    const showStatus = (item: TodoItem): string => {
        if (item.status == 0) {
            return "Todo";
        } else
            return "Done";
    };
    const filterTodo = (allTodo: TodoItem[]): TodoItem[] => {
        return allTodo.filter((item, index, array) => { return item.status == todoContext.showType; });
    }
    const getTime = (item: TodoItem): string => {
        const dateStr = item.expire_date;
        const date = new Date(Date.parse(dateStr));
        const dateStrShow = date.toLocaleString();
        return dateStrShow;
    }
    const editButtonDisabled = (item: TodoItem) => {
        if (item.status != 1) return false;
        // this.testing();
        return true;
    }
    const doneButtonDiabled = (item: TodoItem) => {
        if (item.status == 1) return true;
        // this.testing();
        return false;
    }
    const todoData = filterTodo(todoContext.ShowTodos());
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
                    <Button disabled={editButtonDisabled(item)} onClick={() => {
                        todoContext.showDetails(item)
                    }}>
                        修改
                    </Button>,
                    <Button disabled={doneButtonDiabled(item)} onClick={() => {
                        todoContext.MarkasDone(item)
                    }}>
                        完成
                    </Button>
                ]}>
                    <List.Item.Meta
                        title={<div>标题： {item.title}</div>}
                        description={<div>到期时间:  {getTime(item)} <div> 优先级: {item.priority}</div></div>}
                    />
                    <Typography.Text mark style={{ fontSize: 20 }}>({showStatus(item)}) </Typography.Text>  {item.content}

                </List.Item>
            }
        />
        <DrawerTodos />
    </Content>)
}

export default TodoList