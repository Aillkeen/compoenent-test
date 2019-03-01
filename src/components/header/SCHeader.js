import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import './SCHeader.less';
import Context from '../context/context';
import AppStore from '~/stores/AppStore';

const { Header, Content } = Layout;

export class SCHeader extends React.Component {
  constructor(props) {
    super(props);

    this.loadContext = this.loadContext.bind(this);
    this.loadContext = this.loadContext.bind(this);
  }

  loadContext() {
    this.forceUpdate();
  }

  render() {
    return (
      <Layout>
        <Header className="header scheader">
          <div
            className="item-header scheader scbutton"
            onClick={() => {
              this.props.collapsedClick();
            }}
          >
            <Icon className="trigger" type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </div>
        </Header>
        <Context loadContext={this.loadContext} />
        <Content style={{ margin: '24px 16px 0' }}> {this.props.children} </Content>
      </Layout>
    );
  }
}

SCHeader.propTypes = {
  children: PropTypes.node,
  collapsed: PropTypes.bool.isRequired,
  collapsedClick: PropTypes.func.isRequired,
};

export default SCHeader;
