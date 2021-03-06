/*
 * @Date: 2021-12-25 12:13:02
 * @LastEditTime: 2021-12-25 13:32:42
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/drawer/drawer.tsx
 */

import moment, { Moment } from 'moment'
import { Component, FormEvent } from 'react';
import { TodoItem } from '../../constant/interface';
import { Input, Form, Layout, DatePicker, Space, Button, Select, Drawer } from 'antd';
import todoContext from '../Todos';
import { observer } from 'mobx-react';
const { Header, Content, Sider } = Layout
const { Option } = Select;

function disabledDate(current: any) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

let dateStr: string
let priority: string

class DrawerTodos extends Component {
    handleDateChange(value: Moment) {
        dateStr = value.format().toString();
        // console.log(dateStr)
    }
    handlePriorityChange(value: any) {
        // console.log(value)
        priority = value
    }
    save(value: any) {
        const editingItem: TodoItem = todoContext.editingItem;
        const updateTodo: TodoItem = {
            id: editingItem.id,
            title: value.title ? value.title : editingItem.title,
            content: value.content ? value.content : editingItem.content,
            status: 0,
            expire_date: dateStr ? dateStr : editingItem.expire_date,
            priority: Number(priority) ? Number(priority) : editingItem.priority
        }
        todoContext.UpdateTodos(updateTodo);
        todoContext.closeDetails(value);
    }
    noSave(value: any) {
        todoContext.closeDetails(value)
    }
    render() {
        const item = todoContext.editingItem;

        return (
            <Drawer
                title="update-item"
                placement='right'
                onClose={todoContext.closeDetails}
                visible={todoContext.detailVisable}
            >
                <Form
                    layout='vertical'
                    onFinish={this.save}
                    onReset={this.noSave}
                    name="editing"
                    autoComplete='off'
                >
                    <Space direction='vertical'>
                        <Form.Item
                            label="??????"
                            name="title"
                        // rules={[{ required: true, message: "????????????" }]}
                        >
                            <Input style={{ width: 200 }} placeholder='??????????????????' />
                        </Form.Item>
                        <Form.Item
                            label="??????"
                            name="content"
                        // rules={[{ required: true, message: '??????todo??????' }]}
                        >
                            <Input style={{ width: 300 }} placeholder='????????????todo??????' />
                        </Form.Item>

                        <Form.Item
                            label="????????????"
                            name="expire_date"
                        // rules={[{ required: true, message: '??????????????????' }]}
                        >
                            <DatePicker showTime onOk={this.handleDateChange} placeholder="????????????????????????" disabledDate={disabledDate} />
                        </Form.Item>
                        <Form.Item
                            label="?????????"
                            name="priority"
                        // rules={[{ required: true, message: '???????????????' }]}
                        >
                            <Select style={{ width: 150 }} onChange={this.handlePriorityChange} placeholder="?????????????????????" >
                                <Option value="1">?????????1</Option>
                                <Option value="2">?????????2</Option>
                                <Option value="3">?????????3</Option>
                            </Select>
                        </Form.Item>
                    </Space>
                    <Space direction='vertical'>
                        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{ height: 50, width: 100 }}>
                                ??????
                            </Button>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 10, span: 16 }} >
                            <Button type="primary" htmlType="reset" style={{ height: 50, width: 100 }}>
                                ??????
                            </Button>
                        </Form.Item>
                    </Space>
                </Form>

            </Drawer >
        )
    }
}

export default DrawerTodos