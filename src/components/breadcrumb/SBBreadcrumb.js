import React from 'react';
import { observer } from 'mobx-react';
import { Breadcrumb, Icon, Card } from 'antd';
import { Link } from 'react-router-dom';

@observer
class SBBreadcrumb extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { itens } = this.props;

    let breadcrumbItens = [];

    itens.forEach(e => {
      if (e.link) {
        breadcrumbItens.push(
          <Breadcrumb.Item key={e.title}>
            <Link to={e.link}>
              <Icon type={`${e.icon}`} />
              {e.title}
            </Link>
          </Breadcrumb.Item>
        );
      } else {
        breadcrumbItens.push(<Breadcrumb.Item key={e.title}>{e.title}</Breadcrumb.Item>);
      }
    });

    return (
      <Card className="sb-breadcrumb">
        <Breadcrumb>{breadcrumbItens}</Breadcrumb>
      </Card>
    );
  }
}

export default SBBreadcrumb;
