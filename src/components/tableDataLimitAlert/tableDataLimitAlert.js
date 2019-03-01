import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

export class TableDataLimitAlert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.dataCount >= this.props.dataLimit) {
      return (
        <Alert
          style={{ marginBottom: '10px' }}
          message={
            'Muitos dados encontrados. Apenas ' +
            this.props.dataLimit +
            ' itens estão sendo listados. Refine sua busca.'
          }
          type="info"
          showIcon
        />
      );
    } else {
      return null;
    }
  }
}

TableDataLimitAlert.propTypes = {
  dataLimit: PropTypes.number.isRequired,
  dataCount: PropTypes.number.isRequired,
};
export default TableDataLimitAlert;
