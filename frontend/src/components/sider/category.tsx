/*
 * @Date: 2021-12-24 14:43:19
 * @LastEditTime: 2021-12-24 21:51:13
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/sider/category.tsx
 */
import { Menu } from 'antd'
import todoContext from '../Todos';
const { SubMenu } = Menu;

let handleClick = (e: any) => {
    todoContext.showType = Number(e.key);
    console.log(2)
    // todoContext.FetchTodos();
    // window.location.reload()
}

const Category: React.FC = () => {
    return (<Menu
        mode="inline"
        defaultOpenKeys={['sub1']}
        defaultSelectedKeys={[todoContext.showType.toString()]}
        style={{ height: '100%', borderRight: 0 }}
        onClick={handleClick}
    >
        <SubMenu key="sub1" >
            <Menu.Item key="0">未完成</Menu.Item>
            <Menu.Item key="1">已完成</Menu.Item>
            <Menu.Item key="2">过期啦</Menu.Item>
        </SubMenu>
    </Menu>)
}

export default Category;