/*
 * @Date: 2021-12-21 18:08:09
 * @LastEditTime: 2021-12-23 16:27:57
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/App.tsx
 */
import React, { Component, FormEvent, useDebugValue } from 'react';
import './App.css';
import Header from "./Header"
import { observer } from "mobx-react";
import { Layout, List, Row, Form, Button, Divider, Drawer, Input, FormProps, FormInstance, Typography } from 'antd';
import TodoContext from './Todos';
import { TodoItem } from '../constant/interface';
import todoContext from './Todos';
import FormComponentProps from 'antd/es/form';
import { ImportsNotUsedAsValues } from 'typescript';
import { useForm } from 'antd/es/form/Form';

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
            status: 0
        }
        TodoContext.AddTodos(newTodo);
        // this.props.form.resetFields();
        // });
    }
    itemDelete = () => {

    }
    render() {
        const Demo = () => {
            const [form] = Form.useForm();
        }
        const todoData = TodoContext.todoList;
        // const itemDelete = (
        //     <div
        //         style={{
        //             textAlign: 'center',
        //             marginTop: 12,
        //             height: 32,
        //             lineHeight: '32px',
        //         }}
        //     >
        //         <Button onClick={this.itemDelete}>delete</Button>
        //     </div>
        // );

        // console.log(todoData)
        return (
            <Layout>
                <Header />
                <div className='create-item'>

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

                </div>
                <div className='todoList'>
                    <Row>
                        <List
                            itemLayout="horizontal"
                            dataSource={todoData}
                            renderItem={item =>

                                <List.Item actions={[
                                    <Button onClick={() => {
                                        TodoContext.RemoveTodos(item)
                                    }}>
                                        删除
                                    </Button>,
                                    <Button onClick={() => {
                                        TodoContext.RemoveTodos(item)
                                    }}>
                                        修改
                                    </Button>,
                                    <Button onClick={() => {
                                        TodoContext.RemoveTodos(item)
                                    }}>
                                        完成
                                    </Button>
                                ]}>
                                    <List.Item.Meta
                                        title={<div>{item.id}</div>}
                                    />
                                    <Typography.Text mark>[todo] </Typography.Text>{item.content}
                                </List.Item>
                            }
                        />
                        <Divider orientation="left">Small Size</Divider>
                        <Drawer
                            title="修改任务信息"
                            width={500}
                            bodyStyle={{ paddingBottom: 80 }}
                            destroyOnClose={true}
                        >
                            abc
                        </Drawer>
                    </Row>
                </div>
            </Layout >
        );
    }

}
export default Todo;
