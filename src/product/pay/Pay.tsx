import { Card, Col, Row } from "antd";
import React from "react";

const Pay: React.FC = (props) => {
  return (
    <div>
      <div>
        <Row>
          <Col><Card>88</Card></Col>
          <Col><Card>9.9</Card></Col>
          <Col><Card>99</Card></Col>
          <Col><Card>10.24</Card></Col>
        </Row>
      </div>
      <div>扫码购买</div>
    </div>
  );
}

export default Pay;