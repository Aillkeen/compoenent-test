import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

class SBSelect extends React.Component {
  render() {
    let defaultProps = {};

    if (this.props.isAsync) {
      defaultProps = {
        showSearch: true,
        filterOption: false,
      };
    }

    let options = this.props.options.map((option, idx) => {
      option.key = `option-${this.props.optionKey}-${idx}`;
      return option;
    });

    return (
      <Select {...Object.assign(defaultProps, this.props)}>
        {options.map((option, idx) => (
          <Select.Option value={option[this.props.optionKey]}>{option[this.props.optionLabel]}</Select.Option>
        ))}
      </Select>
    );
  }
}

SBSelect.defaultProps = {
  messageOfNotContentFound: 'Nenhum registro encontrado',
  style: { width: '100%' },
  placeholder: 'Pesquisar',
};

SBSelect.propTypes = {
  isAsync: PropTypes.bool,
};

export default SBSelect;
