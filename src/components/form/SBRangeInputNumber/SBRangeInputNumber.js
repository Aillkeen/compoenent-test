import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, InputNumber } from 'antd';
import { observer } from 'mobx-react';
/**
 * @author Julio
 */

@observer
class SBRangeInputNumber extends React.Component {
  render() {
    const InputGroup = Input.Group;
    const { getFieldDecorator } = this.props.form;
    return (
      <InputGroup compact>
        <Form.Item>
          {getFieldDecorator(`${this.props.field}Inicial`, this.props.fieldDecoratorPropsInicial)(
            <InputNumber
              min={this.props.minInicial}
              max={this.props.maxInicial}
              style={{ width: 100, textAlign: 'center' }}
              placeholder="De"
            />
          )}
        </Form.Item>

        <span style={{ lineHeight: '35px', display: 'inline-block', width: '24px', textAlign: 'center' }}>~</span>

        <Form.Item>
          {getFieldDecorator(`${this.props.field}Final`, this.props.fieldDecoratorPropsFinal)(
            <InputNumber
              min={this.props.minFinal}
              max={this.props.maxFinal}
              style={{ width: 100, textAlign: 'center' }}
              placeholder="Até"
            />
          )}
        </Form.Item>
      </InputGroup>
    );
  }
}

SBRangeInputNumber.defaultProps = {
  fieldDecoratorPropsInicial: {},
  fieldDecoratorPropsFinal: {},
  minInicial: 0,
  minFinal: 0,
  maxInicial: undefined,
  maxFinal: undefined,
};

SBRangeInputNumber.propTypes = {
  field: PropTypes.string.isRequired,
  form: PropTypes.any.isRequired,
};

export default SBRangeInputNumber;
