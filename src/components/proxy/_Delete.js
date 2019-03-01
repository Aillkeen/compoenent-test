import React from 'react';
import PropTypes from 'prop-types';

import AppStore from '../../stores/AppStore';

/**
 * Verifica se o usuário possui permissão para excluir
 */
class Delete extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (AppStore.permiteExcluirByUrl(this.props.url)) return this.props.children;
    return null;
  }
}

Delete.displayName = 'Delete';

Delete.propTypes = {
  children: PropTypes.any.isRequired,
  url: PropTypes.string.isRequired,
};

Delete.contextTypes = {
  router: PropTypes.object,
};

export default Delete;
