import React, { Component } from 'react';
import { Form, Input } from 'antd';

class SBInput extends Component {
  render() {
    const { label, domainAttribute, placeholder, form, store, initialValue, disabled } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form.Item label={label}>
        {getFieldDecorator(domainAttribute, {
          rules: store.getRules(domainAttribute),
          initialValue: initialValue ? initialValue : store.object[domainAttribute],
          onChange: store.updateAttributeDecorator,
        })(<Input disabled={disabled ? disabled : false} placeholder={placeholder} />)}
      </Form.Item>
    );
  }
}

export default SBInput;
