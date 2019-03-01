import React from 'react';
import PropTypes from 'prop-types';

import AppStore from '../../stores/AppStore';

/**
 * Verifica se o usuário possui permissão para excluir gravados
 */
class DeleteGravados extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (AppStore.permiteExcluirGravadosByUrl(this.props.url)) return this.props.children;
    return null;
  }
}

DeleteGravados.displayName = 'DeleteGravados';

DeleteGravados.propTypes = {
  children: PropTypes.any.isRequired,
  url: PropTypes.string.isRequired,
};

DeleteGravados.contextTypes = {
  router: PropTypes.object,
};

export default DeleteGravados;
