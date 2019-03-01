import React from 'react';
import PropTypes from 'prop-types';
import { Select, Form, Row, Col, Tag, DatePicker, Input, Icon, Divider, Button } from 'antd';
import { observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import SBSearchObject from './SBSearchObject';
import Operators from '~/constants/Operators';
import SBPowerSelectStore from '~/components/form/SBPowerSelect/SBPowerSelectStore';
import AppStore from '~/stores/AppStore';
import SBSearchType from '~/components/form/SBPowerSearch/SBSearchType';
import { getValueDate, isADateString } from '~/utils/date';
import moment from 'moment';
import General from '~/constants/General';
/**
 * @author Julio e Helisson
 */

const inputColProps = {
  xs: { span: 20 },
  sm: { span: 20 },
  md: { span: 20 },
  lg: { span: 21 },

  xl: { span: 21 },
  xxl: { span: 22 },
};

const buttonsColProps = {
  xs: { span: 4 },
  sm: { span: 4 },
  md: { span: 4 },
  lg: { span: 3 },

  xl: { span: 3 },
  xxl: { span: 2 },
};
@observer
class SBPowerSearch extends React.Component {
  @observable
  filterParameters = [];

  @observable
  currentFilter = [];

  @observable
  valueList = [];

  @observable
  itsValue = false;

  @observable
  loading = false;

  selectProps;

  searchStore;

  openedDatePicker = false;

  columns = [];

  expectedArgs = null;

  constructor(props) {
    super(props);
    this._updateValueList = this._updateValueList.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this._onDeselect = this._onDeselect.bind(this);
    this._optionFilter = this._optionFilter.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this.columns = this.props.columns ? this.props.columns : this.props.store.searchAttributes;
  }

  componentDidMount() {
    this._appendSearchObjectFromContext();
    this._updateValueList();
  }

  _appendSearchObjectFromContext() {
    if (this.columns) {
      this.columns.forEach(column => {
        if (column.context) {
          const valueInContext = AppStore.get(column.context);
          if (valueInContext) {
            let operator = {};
            const property = { value: column.value, text: column.text };
            let value = [];
            if (valueInContext instanceof Date) {
              operator = {
                value: Operators.POWER_SEARCH_PERIOD_MONTH.operator,
                text: Operators.POWER_SEARCH_PERIOD_MONTH.text,
              };
              value.push({
                value: getValueDate(valueInContext),
                text: moment(valueInContext).format(General.shortBrazilianFormatWithYear),
              });
            } else {
              operator = { value: Operators.EQUAL_TO.operator, text: Operators.EQUAL_TO.text };
              value.push({ value: valueInContext, text: valueInContext });
            }
            this.filterParameters.push(new SBSearchObject(property, operator, value));
          }
        }
      });
    }
  }

  _updateValueList() {
    if (this.currentFilter.length === 0) {
      this.searchStore = null;
      this.valueList.replace(
        this.columns.map(item => {
          return { value: item.value, text: item.text, type: 'column' };
        })
      );
    } else if (this.currentFilter.length === 1) {
      const operadoresPossiveis = Object.keys(Operators).filter(key =>
        Operators[key].types.includes(this.selectProps.type)
      );
      this.valueList.replace(
        operadoresPossiveis.map(key => {
          return { value: Operators[key].operator, text: Operators[key].text, type: 'operator' };
        })
      );
    } else if (this.currentFilter.length === 2) {
      switch (this.selectProps.type) {
        case SBSearchType.POWER_SELECT:
          const { powerSelectProps } = this.selectProps;
          this.searchStore = new SBPowerSelectStore(
            powerSelectProps.domain,
            powerSelectProps.service,
            powerSelectProps.options,
            powerSelectProps.attributes
          );
          this.valueList = this.searchStore.lista;
          break;
        case SBSearchType.NUMBER:
        case SBSearchType.TEXT:
          this.valueList.replace([]);
          break;
        case SBSearchType.ENUM:
          this.valueList.replace(this.selectProps.options);
          break;
        case SBSearchType.DATE:
        case SBSearchType.MONTH:
          this.valueList.replace([]);
          this.openedDatePicker = true;
          break;
      }
    }
  }

  @action
  _onSelect(value, option) {
    if (value && option) {
      if (value === 'default-search') {
        this._onSubmit(null);
      } else {
        if (this.currentFilter.length === 0) {
          //primeira iteração deve armazenar as propriedade da coluna
          this.selectProps = this.columns.find(i => i.value === value);
        }

        const sizeCurrentFilter = this.currentFilter.length;

        if (sizeCurrentFilter === 0) {
          this.currentFilter.push({ value: value, text: this.selectProps.text });
        } else if (sizeCurrentFilter === 1) {
          this.currentFilter.push({ value: value, text: Operators[value].text });
          this.expectedArgs = Operators[value].expectedArgs;
        } else if (sizeCurrentFilter < 2 + this.expectedArgs) {
          switch (this.selectProps.type) {
            case SBSearchType.DATE:
              //Se for uma data tem tratamento especial
              this.currentFilter.push({
                value: getValueDate(value),
                text: value.format(General.brazilianFormat),
              });
              break;
            case SBSearchType.MONTH:
              //Se for um mes tem tratamento especial
              this.currentFilter.push({
                value: getValueDate(value),
                text: value.format(General.shortBrazilianFormatWithYear),
              });
              break;
            default:
              this.currentFilter.push({ value: value, text: option.props.children });
          }
        }

        if (this.currentFilter.length === 2 + this.expectedArgs) {
          this.filterParameters.push(
            new SBSearchObject(this.currentFilter[0], this.currentFilter[1], this.currentFilter.slice(2))
          );
          this.currentFilter = [];
          this.expectedArgs = null;
          this.selectProps = null;
          this._updateValueList();
          this.openedDatePicker = false;
        }
      }
    }
  }

  @action
  _onDeselect(value, option) {
    if (value && option) {
      const beforeRemoveLength = this.currentFilter.length;
      this.currentFilter.replace(this.currentFilter.filter(val => val.text !== value));
      this.filterParameters.replace(this.filterParameters.filter(val => val.toString() !== value));
      const afterRemoveLength = this.currentFilter.length;

      if (
        afterRemoveLength > 0 &&
        beforeRemoveLength !== afterRemoveLength &&
        !this.isSearchFormat(this.currentFilter)
      ) {
        //Se foi removido algum token
        this.currentFilter.replace([]);
      }
      this._updateValueList();
    }
  }

  @action
  _onSearhReset(option) {
    this.currentFilter.replace([]);
    this.filterParameters.replace([]);
    this.openedDatePicker = false;
    this.expectedArgs = null;
    this._updateValueList();
    this._onSubmit(null);
  }

  _onSearch(value) {
    if (this.selectProps && this.currentFilter.length >= 2) {
      if (this.searchStore && this.selectProps.type === SBSearchType.POWER_SELECT) {
        const key = this.selectProps.powerSelectProps.value
          ? this.selectProps.powerSelectProps.value
          : this.selectProps.powerSelectProps.attributes[0];

        this.searchStore._onPowerSearch(value, key, this.selectProps.powerSelectProps.text);
      } else if (this.selectProps.type === SBSearchType.TEXT) {
        this.valueList.replace([{ value: value, text: value }]);
      } else if (this.selectProps.type === SBSearchType.NUMBER && !isNaN(value)) {
        this.valueList.replace([{ value: value, text: value }]);
      }
    }
  }

  _onSubmit(event) {
    event && event.preventDefault();
    let filterParameters = [];
    this.filterParameters.forEach(item => (filterParameters = filterParameters.concat(item.toBodyParameter())));

    this.props.store.searchFilter(this.props.fixedFilter, null, filterParameters);
    this.refs.powerSearchSelect.blur();
    if (this.props.onSubmit) {
      this.props.onSubmit(event);
    }
  }

  _optionFilter(inputValue, option) {
    const normIn = inputValue
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ /g, '')
      .toLowerCase();

    const normOp = option.props.children
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ /g, '')
      .toLowerCase();

    return normOp.includes(normIn);
  }

  render() {
    return (
      <div>
        <Form className="ant-advanced-search-form" onSubmit={e => this._onSubmit(e)}>
          <Row gutter={12} className="sb-mb-10">
            <Col {...inputColProps} style={{ display: 'block' }}>
              <Form.Item style={{ marginBottom: '0' }}>
                <Select
                  autoFocus
                  ref="powerSearchSelect"
                  className="sb-power-search"
                  mode="multiple"
                  placeholder="Pesquisar"
                  value={this.concatArrays}
                  onSelect={this._onSelect}
                  onChange={this._updateValueList}
                  onDeselect={this._onDeselect}
                  onSearch={this._onSearch}
                  style={{ width: '100%' }}
                  filterOption={this._optionFilter}
                  loading={this.searchStore ? this.searchStore.loading : false}
                >
                  {!this.selectProps && this.filterParameters.length >= 1 && (
                    <Select.Option
                      className={'sb-power-search-default'}
                      key={'default-search'}
                      value={'default-search'}
                    >
                      <Icon type="search" /> Pesquisar
                    </Select.Option>
                  )}
                  {this.valueList.map((item, index) => (
                    <Select.Option className={'sb-power-search'} key={`${item.value}-${index}`} value={item.value}>
                      {item.text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col {...buttonsColProps} style={{ display: 'block', float: 'right' }}>
              <Button.Group>
                <Button type="primary" htmlType="submit" icon="search" />
                <Button icon="delete" onClick={option => this._onSearhReset(option)} />
              </Button.Group>
            </Col>
          </Row>
        </Form>
        {this.selectProps && this.selectProps.type === SBSearchType.DATE ? (
          <DatePicker
            style={{ position: 'absolute', visibility: 'collapse', top: '0px' }}
            open={this.openedDatePicker}
            onChange={(value, option) => this._onSelect(value, option)}
          />
        ) : (
          <DatePicker.MonthPicker
            style={{ position: 'absolute', visibility: 'collapse', top: '0px' }}
            open={this.openedDatePicker}
            onChange={(value, option) => this._onSelect(value, option)}
          />
        )}
      </div>
    );
  }

  @computed
  get concatArrays() {
    if (this.filterParameters.length > 0) {
      const result = this.filterParameters.map(item => {
        return item.toString();
      });

      return result.concat(this.currentFilter.map(item => item.text));
    }

    return this.filterParameters
      .map(item => {
        return item.toString();
      })
      .concat(this.currentFilter.map(item => item.text));
  }

  /**
   * Método que verifica se o filtro atual que está sendo montado segue o formato de geração
   * O formato esperado é [coluna, operador, n-valores]
   * @param {} currentFilter - array do filtro atual que está sendo montado
   */
  isSearchFormat(currentFilter) {
    const size = currentFilter.length;
    if (size == 0) return true;
    else if (size == 1) return this.isColumn(currentFilter[0].value);
    else if (size >= 2) return this.isColumn(currentFilter[0].value) && this.isOperator(currentFilter[1].value);
  }

  isColumn(value) {
    return this.columns.find(key => key.value === value);
  }

  isOperator(value) {
    return Object.keys(Operators).find(key => key === value);
  }
}

SBPowerSearch.defaultProps = {
  notContentMessage: 'Nenhum registro encontrado',
  style: { width: '100%' },
  fixedFilter: {},
};

SBPowerSearch.propTypes = {
  columns: PropTypes.array,
  store: PropTypes.any.isRequired,
  fixedFilter: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default SBPowerSearch;
