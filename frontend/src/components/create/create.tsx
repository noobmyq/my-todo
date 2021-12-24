/*
 * @Date: 2021-12-24 14:46:24
 * @LastEditTime: 2021-12-24 16:09:19
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/create/create.tsx
 */
import moment, { Moment } from 'moment'
import { Component, FormEvent } from 'react';
import { TodoItem } from '../../constant/interface';
import { Input, Form, Layout, DatePicker, Space, Button } from 'antd';
import todoContext from '../Todos';
import { observable } from 'mobx';
import { type } from 'os';
const { Header, Content, Sider } = Layout

function disabledDate(current: any) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

let dateStr: string = ""

class CreateTodos extends Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    onChange(value: any, dateString: any) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    onOk(value: Moment) {
        dateStr = value.format().toString();
        console.log(dateStr)
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
            // content: values.content
            content: value.content,
            status: 0,
            expire_date: dateStr
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
                    <Form.Item
                        label="Expire_date"
                        name="expire_date"
                        rules={[{ required: true, message: '输入到期时间' }]}
                    >
                        <DatePicker showTime onOk={this.onOk} placeholder="选择到期时间" disabledDate={disabledDate} />
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

            </Content>
        )
    }
}

export default CreateTodos