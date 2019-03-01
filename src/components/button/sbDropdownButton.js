import React, { Component } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';

class SbDropdownButton extends Component {
  render() {
    const { menus, icon, style } = this.props;
    const overlay = (
      <Menu>
        {menus.map((item, index) => {
          return (
            <Menu.Item key={item.label + index}>
              <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    );
    return (
      <Dropdown overlay={overlay}>
        <Button icon={icon ? icon : 'dash'} style={style ? style : null} />
      </Dropdown>
    );
  }
}

export default SbDropdownButton;
