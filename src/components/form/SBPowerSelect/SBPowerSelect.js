import React from 'react';
import PropTypes from 'prop-types';
import { Select, Form } from 'antd';
import { observer } from 'mobx-react';
import SBPowerSelectStore from './SBPowerSelectStore';
/**
 * @author Julio
 */

@observer
class SBPowerSelect extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form.Item label={this.props.label} style={{ width: '100%' }}>
        {getFieldDecorator(this.props.field, {
          onChange: (value, options) =>
            this.props.store.updateSelectAttributeDecorator(value, options, this.props.onChange),
          initialValue: this.props.selectedItem,
          rules: this.props.rules,
        })(
          <Select
            allowClear
            style={this.props.style}
            placeholder={this.props.placeholder}
            showSearch
            disabled={this.props.disabled}
            onSearch={this.props.store._onSearch}
            loading={this.props.store.loading}
            notFoundContent={
              !this.props.store.loading && !this.props.store.query
                ? 'Digite 1 caractere para buscar'
                : this.props.notContentMessage
            }
            filterOption={false}
          >
            {this.props.store.lista.map(item => (
              <Select.Option key={this.props.field} value={item[this.props.itemKey]}>
                {this.props.itemLabel.map(label => item[label]).join(' | ')}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}

SBPowerSelect.defaultProps = {
  notContentMessage: 'Nenhum registro encontrado',
  style: { width: '100%' },
  placeholder: 'Buscar',
  rules: [],
  label: '',
  disabled: false,
};

SBPowerSelect.propTypes = {
  field: PropTypes.string.isRequired,
  selectedItem: PropTypes.any,
  onChange: PropTypes.func,
  store: PropTypes.instanceOf(SBPowerSelectStore).isRequired,
  itemKey: PropTypes.string.isRequired,
  itemLabel: PropTypes.arrayOf(PropTypes.string).isRequired,
  form: PropTypes.any.isRequired,
  rules: PropTypes.array,
};

export default SBPowerSelect;
