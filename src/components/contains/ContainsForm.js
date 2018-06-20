import React, {Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './Contains.css';

const FormItem = Form.Item;

class ContainsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitForm(values)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('endpoint', {
            rules: [{ required: true, message: 'Please input your Endpoint!' }],
          })(
            <Input prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Endpoint" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('tag', {
            rules: [{ required: true, message: 'Please input your tags!' }],
          })(
            <Input prefix={<Icon type="code-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Tag" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('text', {
            rules: [{ required: true, message: 'Please input your text!' }],
          })(
            <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Text" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Submit Form
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ContainsForm);