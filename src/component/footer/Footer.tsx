import './Footer.css';
import React from "react";
import { Col, Divider, Row } from 'antd';

const Footer: React.FC = (props) => {
  return (
    <div className="App-footer-float">
      <div id="footer" className="App-footer">
        <Divider></Divider>
        <div>
          <Row justify="center" align="middle">
            <Col>
              <div>© 2022 重庆红矮星科技有限公司</div>
              <div>渝ICP备1700232号-6 <a href="mailto:jiangxiaoqiang@zqhaxkjyxgs.wecom.work">联系我们</a></div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Footer;