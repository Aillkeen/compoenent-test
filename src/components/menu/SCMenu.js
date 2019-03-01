import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Tooltip } from 'antd';
import './SCMenu.less';

const { SubMenu } = Menu;
const { Sider } = Layout;

export class SCMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  _buildMenu(menu, i) {
    let item;
    if (menu.links && menu.links.length > 0) {
      const itemsList = this._renderSubMenu(menu.links);

      item = (
        <SubMenu
          key={menu.key ? menu.key : 'submenu-' + i}
          className={menu.insideMenu && 'sc-inside-menu'}
          title={
            <Tooltip
              className="sb-menu-tooltip"
              placement={this.props.collapsed ? 'topRight' : 'right'}
              title={menu.tooltip}
            >
              <div>
                {menu.icon && <Icon type={menu.icon} />}
                <span>{menu.title}</span>
              </div>
            </Tooltip>
          }
        >
          {itemsList}
        </SubMenu>
      );
    } else {
      if (menu.icon && menu.icon.trim !== '') {
        item = (
          <Menu.Item key={menu.key ? menu.key : 'menu-' + i + '-'}>
            <Tooltip
              className="sb-menu-tooltip"
              placement={this.props.collapsed ? 'topRight' : 'right'}
              title={menu.tooltip}
            >
              <Link to={`${menu.href}`}>
                <Icon type={menu.icon} />
                {!this.props.collapsed ? menu.title : ''}
              </Link>
            </Tooltip>
          </Menu.Item>
        );
      } else {
        item = (
          <Menu.Item
            key={menu.key ? menu.key : 'link-' + i}
            className="scmenu-item"
            style={{
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            <Tooltip className="sb-menu-tooltip" placement="right" title={menu.tooltip}>
              <Link to={`${menu.href}`}>{menu.title}</Link>
            </Tooltip>
          </Menu.Item>
        );
      }
    }
    return item;
  }

  _renderSubMenu(menuList) {
    let subMenuList = [];

    if (menuList && menuList.length > 0) {
      for (let i = 0; i < menuList.length; i++) {
        const subMenu = this._buildMenu(menuList[i], i);
        subMenuList.push(subMenu);
      }
    }
    return subMenuList;
  }

  render() {
    return (
      <Sider collapsible breakpoint="lg" className="scmenu" collapsed={this.props.collapsed} trigger={null}>
        <div className={`scmenu-logo${this.props.collapsed ? '-collapsed' : ''}`}>
          <img
            src={`/images/${this.props.collapsed ? 'sc_text.png' : 'sc_white.png'}`}
            className={`${this.props.collapsed ? 'scmenu-img-collapsed' : 'scmenu-img'}`}
          />
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
          className="scmenu"
          inlineCollapsed={this.props.collapsed}
        >
          {this._renderSubMenu(this.props.subMenus)}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(SCMenu);
