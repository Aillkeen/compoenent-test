import React from 'react';
import PropTypes from 'prop-types';

import AppStore from '../../stores/AppStore';

/**
 * Verifica se o usuário possui permissão para incluir
 */
class Access extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (AppStore.permiteAcessoByUrl(this.props.url)) return this.props.children;
    return null;
  }
}

Access.displayName = 'Access';

Access.propTypes = {
  children: PropTypes.any.isRequired,
  url: PropTypes.string.isRequired,
};

Access.contextTypes = {
  router: PropTypes.object,
};

export default Access;
