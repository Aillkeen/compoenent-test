import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente responsável por mostrar o filho selecionado.
 */
class SynchroArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameChildVisible: '',
    };
    this._toggleChild = this._toggleChild.bind(this);
  }

  _toggleChild(nameChild) {
    let nameChildVisible = this.state.nameChildVisible == nameChild ? '' : nameChild;
    this.setState({ nameChildVisible: nameChildVisible });
  }

  render() {
    let childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        nameChildVisible: this.state.nameChildVisible,
        toggleOpenItem: this._toggleChild,
      })
    );

    return <div>{childrenWithProps}</div>;
  }
}

SynchroArea.displayName = 'SynchroArea';

SynchroArea.propTypes = {
  children: PropTypes.any,
};

export default SynchroArea;
