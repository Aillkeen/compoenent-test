import React from 'react';
import PropTypes from 'prop-types';

import AppStore from '../../stores/AppStore';

/**
 * Verifica se o usuário possui permissão para salvar
 */
class Save extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.actionType === 'new') {
      if (AppStore.permiteIncluirByUrl(this.props.url)) return this.props.children;
    } else if (this.props.actionType === 'edit') {
      if (AppStore.permiteAlterarByUrl(this.props.url)) return this.props.children;
    }
    return null;
  }
}

Save.displayName = 'Save';

Save.propTypes = {
  actionType: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  url: PropTypes.string.isRequired,
};

Save.contextTypes = {
  router: PropTypes.object,
};

export default Save;
