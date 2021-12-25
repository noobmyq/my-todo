/*
 * @Date: 2021-12-25 12:13:02
 * @LastEditTime: 2021-12-25 13:16:02
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/drawer/drawer.tsx
 */

import moment, { Moment } from 'moment'
import { Component, FormEvent } from 'react';
import { TodoItem } from '../../constant/interface';
import { Input, Form, Layout, DatePicker, Space, Button, Select } from 'antd';
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
        if (!value.title) {
            value.title = editingItem.title
        }
        // const editingItem: TodoItem = todoContext.editingItem;
        const updateTodo: TodoItem = {
            id: editingItem.id,
            title: value.title ? value.title : editingItem.title,
            content: value.content ? value.content : editingItem.content,
            status: 0,
            expire_date: dateStr ? dateStr : editingItem.expire_date,
            priority: Number(priority) ? Number(priority) : editingItem.priority
        }
        console.log(updateTodo)
        todoContext.UpdateTodos(updateTodo);
    }
    noSave(value: any) {
        todoContext.closeDetails(value)
    }
    render() {
        const editingItem: TodoItem = todoContext.editingItem;
        // console.log(editingItem)
        return (
            <Form
                layout='vertical'
                onFinish={this.save}
                onReset={this.noSave}
                name="editing"
                autoComplete='off'
            >
                <Space direction='vertical'>
                    <Form.Item
                        label="标题"
                        name="title"
                    // rules={[{ required: true, message: "输入标题" }]}
                    >
                        <Input style={{ width: 200 }} defaultValue={editingItem.title} />
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                    // rules={[{ required: true, message: '输入todo内容' }]}
                    >
                        <Input style={{ width: 300 }} placeholder='输入todo内容' value={editingItem.content} />
                    </Form.Item>

                    <Form.Item
                        label="到期时间"
                        name="expire_date"
                    // rules={[{ required: true, message: '输入到期时间' }]}
                    >
                        <DatePicker showTime onOk={this.handleDateChange} placeholder="选择到期时间" disabledDate={disabledDate} value={moment(editingItem.expire_date)} />
                    </Form.Item>
                    <Form.Item
                        label="优先级"
                        name="priority"
                    // rules={[{ required: true, message: '选择优先级' }]}
                    >
                        <Select style={{ width: 150 }} onChange={this.handlePriorityChange} placeholder="选择优先级" value={editingItem.priority.toString()}>
                            <Option value="1">优先级1</Option>
                            <Option value="2">优先级2</Option>
                            <Option value="3">优先级3</Option>
                        </Select>
                    </Form.Item>
                </Space>
                <Space direction='vertical'>
                    <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ height: 50, width: 100 }}>
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 10, span: 16 }} >
                        <Button type="primary" htmlType="reset" style={{ height: 50, width: 100 }}>
                            Clear
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
        )
    }
}

export default DrawerTodos