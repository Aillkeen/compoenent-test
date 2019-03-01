import React from 'react';
import { observer } from 'mobx-react';
import { Collapse, Col, Row } from 'antd';
import { action } from 'mobx';

@observer
class SBCollapseInfoPanel extends React.Component {
  DEFAULT_COLUMNS = 4;
  constructor(props) {
    super(props);
    this.objectToView = this.objectToView.bind(this);
  }

  componentDidMount() {}

  @action
  objectToView(object, attributes) {
    let attributesNotNull = [];
    attributes.forEach(att => {
      object[att.attribute] ? attributesNotNull.push(att) : null;
    });
    return object.toView(attributesNotNull);
  }

  render() {
    const { object } = this.props;
    const { attributes } = this.props;
    const Panel = Collapse.Panel;

    if (object) {
      let children = [];
      let countColumns = 0;
      this.objectToView(object, attributes).forEach(e => {
        children.push(
          <Col span={24 / this.DEFAULT_COLUMNS} key={e.text}>
            <h5>{e.text}:</h5>
            <h3>{e.render ? e.render(e.value) : e.value}</h3>
          </Col>
        );
        if (countColumns + 1 == this.DEFAULT_COLUMNS) {
          children.push(<Row key={1} />);
          countColumns = 0;
        } else {
          countColumns++;
        }
      });

      return (
        <Collapse bordered={false}>
          <Panel header={this.props.title} key="1">
            {children}
          </Panel>
        </Collapse>
      );
    } else {
      return '';
    }
  }
}

export default SBCollapseInfoPanel;
