/*
 * @Date: 2021-12-24 14:46:24
 * @LastEditTime: 2021-12-24 17:30:15
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/create/create.tsx
 */
import moment, { Moment } from 'moment'
import { Component, FormEvent } from 'react';
import { TodoItem } from '../../constant/interface';
import { Input, Form, Layout, DatePicker, Space, Button, Select } from 'antd';
import todoContext from '../Todos';
const { Header, Content, Sider } = Layout
const { Option } = Select;
function disabledDate(current: any) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

let dateStr: string
let priority: string

class CreateTodos extends Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    handleDateChange(value: Moment) {
        dateStr = value.format().toString();
        console.log(dateStr)
    }
    handlePriorityChange(value: any) {
        console.log(value)
        priority = value
    }

    reset(e: FormEvent) {
        e.preventDefault();
        console.log("here");
        todoContext.ClearTodos();
    }
    submit(value: any) {
        // this.props.form.validateFields((values: { content: string }) => {
        // console.log(this.dateStr)
        const newTodo: TodoItem = {
            id: todoContext.numofItems,
            title: value.title,
            content: value.content,
            status: 0,
            expire_date: dateStr,
            priority: Number(priority)
        }
        todoContext.AddTodos(newTodo);
        // this.props.form.resetFields();
        // });
    }
    render() {
        return (
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
                    labelCol={{ span: 0 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Space direction='vertical'>
                        <Form.Item
                            label="标题"
                            name="title"
                            rules={[{ required: true, message: "输入标题" }]}
                        >
                            <Input style={{ width: 200 }} placeholder='输入标题' />
                        </Form.Item>
                        <Form.Item
                            label="内容"
                            name="content"
                            rules={[{ required: true, message: '输入todo内容' }]}
                        >
                            <Input style={{ width: 600 }} placeholder='输入todo内容' />
                        </Form.Item>

                        <Form.Item
                            label="到期时间"
                            name="expire_date"
                            rules={[{ required: true, message: '输入到期时间' }]}
                        >
                            <DatePicker showTime onOk={this.handleDateChange} placeholder="选择到期时间" disabledDate={disabledDate} />
                        </Form.Item>
                        <Form.Item
                            label="优先级"
                            name="priority"
                            rules={[{ required: true, message: '选择优先级' }]}
                        >
                            <Select defaultValue="1" onChange={this.handlePriorityChange}>
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

            </Content>
        )
    }
}

export default CreateTodos