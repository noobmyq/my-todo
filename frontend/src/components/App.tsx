/*
 * @Date: 2021-12-21 18:08:09
 * @LastEditTime: 2021-12-24 14:23:54
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/App.tsx
 */
import React, { Component, FormEvent, useState } from 'react';
import './App.css';
// import Header from "./Header"
import { observer } from "mobx-react";
import { Layout, List, Row, Form, Button, Divider, Drawer, Input, Typography, Menu, Space, DatePicker } from 'antd';
import todoContext from './Todos';
import { TodoItem } from '../constant/interface';
// import { Content } from 'antd/lib/layout/layout';
const { Header, Content, Sider } = Layout
const { SubMenu } = Menu;
// default
@observer class Todo extends Component<any, { sortBy: string }> {
    constructor(props: any) {
        super(props);
        this.state = { sortBy: 'date' }
    };

    reset(e: FormEvent) {
        e.preventDefault();
        console.log("here");
        todoContext.ClearTodos();
    }
    submit(value: any) {
        // this.props.form.validateFields((values: { content: string }) => {
        console.log(value)
        const newTodo: TodoItem = {
            id: todoContext.numofItems,
            // content: values.content
            content: value.content,
            status: 0,
            expire_date: value.expire_date
        }
        todoContext.AddTodos(newTodo);
        // this.props.form.resetFields();
        // });
    }
    showStatus(item: TodoItem): string {
        if (item.status == 0) {
            return "todo";
        } else
            return "done";
    };
    filterTodo(allTodo: TodoItem[]): TodoItem[] {
        return allTodo.filter((item, index, array) => { return item.status == 0; });
    }

    onChange(value: any, dateString: any) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    onOk(value: any) {
        console.log('onOk: ', value);
    }

    render() {
        const wholeData = todoContext.todoList;
        const todoData = this.filterTodo(wholeData);
        console.log(todoData)
        return (
            <Layout>

                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" >
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content className='create-item' style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 80,
                    }}>
                        <Form
                            layout="inline"
                            onFinish={this.submit}
                            onReset={this.reset}
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Content"
                                name="content"
                                rules={[{ required: true, message: '输入todo内容' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Space direction='vertical' size={12}>
                                <DatePicker showTime onChange={this.onChange} onOk={this.onOk} />
                            </Space>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="reset">
                                    Clear
                                </Button>
                            </Form.Item>
                        </Form>

                    </Content>
                    <Content className='todoList'
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
                    </Content>
                </Layout>
            </Layout >
        );
    }

}
export default Todo;
