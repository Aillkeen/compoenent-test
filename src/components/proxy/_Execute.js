import React from 'react';
import PropTypes from 'prop-types';

import AppStore from '../../stores/AppStore';

/**
 * Verifica se o usuário possui permissão para executar
 */
class Execute extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (AppStore.permiteExecutarByUrl(this.props.url)) return this.props.children;
    return null;
  }
}

Execute.displayName = 'Execute';

Execute.propTypes = {
  children: PropTypes.any.isRequired,
  url: PropTypes.string.isRequired,
};

Execute.contextTypes = {
  router: PropTypes.object,
};

export default Execute;
