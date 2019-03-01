import React from 'react';
import { Row, DatePicker, Select, Col, Button } from 'antd';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import classnames from 'classnames';
import AppStore from '~/stores/AppStore';
import General from '~/constants/General';

const { MonthPicker } = DatePicker;
const Option = Select.Option;

const selectColProps = {
  xs: { span: 24, offset: 0 },
  sm: { span: 12, offset: 0 },
  md: { span: 12, offset: 0 },
  lg: { span: 12, offset: 0 },

  xl: { span: 12, offset: 0 },
  xxl: { span: 10, offset: 0 },
};

const pickerColProps = {
  xs: { span: 18, offset: 0 },
  sm: { span: 8, offset: 0 },
  md: { span: 8, offset: 0 },
  lg: { span: 8, offset: 0 },
  xl: { span: 8, offset: 0 },
  xxl: { span: 8, offset: 0 },
};

const btnColProps = {
  xs: { span: 2, offset: 0 },
  sm: { span: 4, offset: 0 },
  md: { span: 4, offset: 0 },
  lg: { span: 4, offset: 0 },

  xl: { span: 4, offset: 0 },
  xxl: { span: 6, offset: 0 },
};

class Context extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showChangeContext: false,
      estabelecimento: null,
      periodo: null,
    };

    this._handleEstabelecimento = this._handleEstabelecimento.bind(this);
    this._handlePeriodo = this._handlePeriodo.bind(this);
  }

  _handleShowChangeContext() {
    this.setState({ showChangeContext: !this.state.showChangeContext });
  }

  _handleEstabelecimento(object) {
    this.setState({ estabelecimento: object });
  }

  _handlePeriodo(object) {
    this.setState({ periodo: object._d });
  }

  _handleAplicar() {
    if (this.state.estabelecimento) AppStore.set('estabelecimentoDefault', this.state.estabelecimento);
    if (this.state.periodo) AppStore.set('periodoDefault', this.state.periodo);

    this.setState({
      showChangeContext: false,
      estabelecimento: null,
      periodo: null,
    });

    this.props.loadContext();
  }

  render() {
    let options;
    let estabelecimentos = AppStore.get('estabelecimentosUsuario');
    let estabelecimentoDefault = estabelecimentos.find(estab => {
      return estab.estabelecimentoCodigo == AppStore.get('estabelecimentoDefault');
    });

    if (estabelecimentos) {
      options = estabelecimentos.map(estab => {
        return {
          label: `${estab.estabelecimentoCodigo} - ${estab.estabelecimentoNome}`,
          value: estab.estabelecimentoCodigo,
        };
      });
    }
    let estabelecimento = estabelecimentoDefault
      ? `${estabelecimentoDefault.estabelecimentoCodigo} - ${estabelecimentoDefault.estabelecimentoNome}`
      : '-';
    let periodo = AppStore.get('periodoDefault')
      ? format(AppStore.get('periodoDefault'), General.shortBrazilianFormatWithYear)
      : '-';

    let classArrow = classnames('fa fa-chevron-right', {
      'fa-rotate-90': this.state.showChangeContext,
    });
    let classBody = classnames('body context-padding', {
      show: this.state.showChangeContext,
    });
    return (
      <div className="ant-card contextFilter">
        <Row className="infoContext" onClick={() => this._handleShowChangeContext()}>
          <span className="arrowIcon">
            <i className={classArrow} />
          </span>
          Estabelecimento: {estabelecimento} | Período: {periodo}
        </Row>

        <Row className={classBody}>
          <Col {...selectColProps}>
            <div>
              <Select
                onChange={this._handleEstabelecimento}
                placeholder="mudar para o estabelecimento..."
                defaultValue={estabelecimentoDefault.estabelecimentoCodigo}
                size="default"
                className="context-select-size"
              >
                {options.map(option => (
                  <Option key={option.value}>{option.label}</Option>
                ))}
              </Select>
            </div>
          </Col>

          <Col {...pickerColProps} className="context-component-padding">
            <MonthPicker onChange={this._handlePeriodo} />
          </Col>
          <Col {...btnColProps} className="align-right context-component-padding">
            <Button onClick={() => this._handleAplicar()} type="primary">
              Aplicar
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

Context.displayName = 'Context';

Context.propTypes = {
  loadContext: PropTypes.func.isRequired,
};

export default Context;
