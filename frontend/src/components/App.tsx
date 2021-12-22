/*
 * @Date: 2021-12-21 18:08:09
 * @LastEditTime: 2021-12-22 20:25:42
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/App.tsx
 */
import React, { Component, FormEvent, useDebugValue } from 'react';
import './App.css';
import Header from "./Header"
import { observer } from "mobx-react";
import { Layout, List, Row, Form, Button, Checkbox, Input, FormProps, FormInstance } from 'antd';
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
            content: value.content
        }
        TodoContext.AddTodos(newTodo);
        // this.props.form.resetFields();
        // });
    }
    render() {
        const Demo = () => {
            const [form] = Form.useForm();
        }
        const todoData = TodoContext.todoList;

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

                        {/* <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item> */}

                        {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item> */}

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
                                <List.Item>
                                    <List.Item.Meta
                                        title={<div>{item.id}</div>}
                                        description={item.content}
                                    />
                                </List.Item>
                            }
                        ></List>
                    </Row>
                </div>
            </Layout >
        );
    }

}
export default Todo;
