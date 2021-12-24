/*
 * @Date: 2021-12-24 14:43:19
 * @LastEditTime: 2021-12-24 14:45:03
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/sider/category.tsx
 */
import { Menu } from 'antd'

const { SubMenu } = Menu;
const Category: React.FC = () => {
    return (<Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
    >
        <SubMenu key="sub1" >
            <Menu.Item key="1">未完成</Menu.Item>
            <Menu.Item key="2">已完成</Menu.Item>
            <Menu.Item key="3">过期啦</Menu.Item>
        </SubMenu>
    </Menu>)
}

export default Category;