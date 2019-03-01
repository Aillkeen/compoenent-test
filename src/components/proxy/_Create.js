import React from 'react';
import PropTypes from 'prop-types';

import AppStore from '../../stores/AppStore';

/**
 * Verifica se o usuário possui permissão para incluir
 */
class Create extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (AppStore.permiteIncluirByUrl(this.props.url)) return this.props.children;
    return null;
  }
}

Create.displayName = 'Create';

Create.propTypes = {
  children: PropTypes.any.isRequired,
  url: PropTypes.string.isRequired,
};

Create.contextTypes = {
  router: PropTypes.object,
};

export default Create;
