/*
 * @Date: 2021-12-24 14:46:24
 * @LastEditTime: 2021-12-24 14:57:54
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/create/create.tsx
 */
import { Input, Form, Layout, DatePicker, Space, Button } from 'antd';
import todoContext from '../Todos';
const { Header, Content, Sider } = Layout
import { Component, FormEvent } from 'react';
import { TodoItem } from '../../constant/interface';

class CreateTodos extends Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    onChange(value: any, dateString: any) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    onOk(value: any) {
        console.log('onOk: ', value);
    }

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
        )
    }
}

export default CreateTodos