import React, { Component } from 'react';
import { Col, Form, Input } from 'antd';

class SBTextArea extends Component {
  render() {
    const { label, domainAttribute, placeholder, form, store, initialValue } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form.Item label={label}>
        {getFieldDecorator(domainAttribute, {
          rules: store.getRules(domainAttribute),
          initialValue: initialValue ? initialValue : store.object[domainAttribute],
          onChange: store.updateAttributeDecorator,
        })(<Input.TextArea placeholder={placeholder} />)}
      </Form.Item>
    );
  }
}

export default SBTextArea;
