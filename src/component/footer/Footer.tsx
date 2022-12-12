import './Footer.css';
import React from "react";
import { Col, Divider, Row } from 'antd';


const Footer: React.FC = (props) => {
  return (
    <div id="footer">
      <Divider className="cruisediv"></Divider>
      <Row justify="center" align="middle">
        <Col className="foot">
          <div>© 2022 重庆红矮星科技有限公司</div>
          <div>渝ICP备1700232号-6</div>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;