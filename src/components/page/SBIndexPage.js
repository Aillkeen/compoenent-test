import { Button, Card, Col, Input, Row, Table } from 'antd';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SBBreadcrumb from '../breadcrumb/SBBreadcrumb';
import TableDataLimitAlert from '../tableDataLimitAlert/tableDataLimitAlert';

@observer
class SBIndexPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { columns, store, pathsBreadcrumb, buttons, onSearch, onChange } = this.props;

    return (
      <div>
        <SBBreadcrumb itens={pathsBreadcrumb} />
        <Card>
          <Row className="sb-mb-10">
            <Col span={16}>
              {buttons
                ? buttons.map(item => {
                    return (
                      <Link key={item.link} to={item.link}>
                        <Button key={item.key} type={'primary'} style={item.style} icon={item.icon ? item.icon : ''}>
                          {item.label}
                        </Button>
                      </Link>
                    );
                  })
                : ''}
            </Col>
            <Col span={8}>
              <Input.Search
                placeholder="Pesquisar"
                onSearch={onSearch ? query => onSearch(query) : query => store.load({ query })}
              />
            </Col>
          </Row>
          <Row>
            <TableDataLimitAlert dataLimit={100} dataCount={store.lista.length} />
          </Row>
          <Table
            bordered
            columns={columns}
            dataSource={store.listaComKey}
            loading={store.loading}
            onChange={onChange}
          />
        </Card>
      </div>
    );
  }
}
export default SBIndexPage;
