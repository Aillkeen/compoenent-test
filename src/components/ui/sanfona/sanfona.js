import React from 'react';
import PropTypes from 'prop-types';
import './sanfona.css';
import AnimateHeight from 'react-animate-height';

const Sanfona = props => {
  let cssTitle;
  let height;
  if (props.opened) {
    cssTitle = 'sanfona-title active';
    height = 'auto';
  } else {
    cssTitle = 'sanfona-title';
    height = 0;
  }

  let icon = '';
  if (props.icon) {
    icon = <img src={`/images/${props.icon}`} style={{ verticalAlign: 'text-bottom' }} />;
  }

  return (
    <div className="sanfona">
      <div className={cssTitle} onClick={() => props.toggle(props.stateKey)}>
        {icon} {props.title} <span />
      </div>
      <AnimateHeight className="sanfona-container" duration={200} height={height}>
        {props.children}
      </AnimateHeight>
    </div>
  );
};

Sanfona.displayName = 'Sanfona';

Sanfona.defaultProps = {
  opened: false,
};

Sanfona.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.string,
  opened: PropTypes.bool,
  stateKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Sanfona;
