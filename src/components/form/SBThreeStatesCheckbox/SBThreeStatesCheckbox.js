import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import { observer } from 'mobx-react';
/**
 * @author Julio
 */

@observer
class SBThreeStatesCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indeterminate: true,
      checked: false,
    };
    this._onChange = this._onChange.bind(this);
  }

  _onChange(e, callback) {
    const checkedAction = e.target.checked;
    let checkTemp = checkedAction;
    let valueForm;
    if (this.state.indeterminate) {
      this.setState({ indeterminate: false });
      checkTemp = false;
      valueForm = this.props.uncheckedValue;
    } else {
      if (checkedAction) {
        this.setState({ checked: true });
        valueForm = this.props.checkedValue;
      } else {
        this.setState({ indeterminate: true, checked: false });
        valueForm = undefined;
      }
    }
    //caso tenha sido clicado para habilitar o checkbox
    e.target.checked = checkTemp;

    //atribuindo no input hidden
    let obj = {};
    obj[this.props.field] = valueForm;
    this.props.form.setFieldsValue(obj);

    //chamando a função de callback recebida
    if (callback) {
      callback(this.props.field, valueForm);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    getFieldDecorator(this.props.field, { initialValue: undefined }); //input hidden

    return getFieldDecorator(`${this.props.field}Check`, {
      valuePropName: 'checked',
      initialValue: this.state.checked,
      onChange: e => this._onChange(e, this.props.onChange),
    })(
      <Checkbox className={this.state.indeterminate ? 'sb-checkbox-three-state' : 'sb-checkbox-three-state-enable'}>
        {this.props.title}
      </Checkbox>
    );
  }
}

SBThreeStatesCheckbox.defaultProps = {
  checkedValue: true,
  uncheckedValue: false,
};

SBThreeStatesCheckbox.propTypes = {
  field: PropTypes.string.isRequired,
  form: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};

export default SBThreeStatesCheckbox;
