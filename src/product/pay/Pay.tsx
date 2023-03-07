import { Card, Col, Divider, Row } from "antd";
import React, { useState } from "react";
import "./Pay.css"
import * as payService  from '../../service/pay/PayService';
import { connect } from "react-redux";

const Pay: React.FC = (props) => {

  React.useEffect(() => {
    let params = {
      outTradeNo: "outTradeNo"
    };
    payService.createQrCodeImpl(params).then((data) => {
      //debugger
      //setFormText(data);
    });
  }, []);
  const formText = props.pay.formText;

  return (
    <div>
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
          <Col>
            <div className="container">
              <Card>
                <div className="card-content">
                  <div className="product">连续包年</div>
                  <span className="product-price">¥88</span>
                </div>
              </Card>
            </div>
          </Col>
          <Col>
            <Card>
              <div className="card-content">
                <div className="product">连续包月</div>
                <span className="product-price">¥9.9</span>
              </div>
            </Card>
          </Col>
          <Col>
            <Card>
              <div className="card-content">
                <div className="product">1年</div>
                <span className="product-price">¥99</span>
              </div>
            </Card>
          </Col>
          <Col>
            <Card>
              <div className="card-content">
                <div className="product">1月</div>
                <span className="product-price">¥10.24</span>
              </div>
            </Card>
          </Col>
        </Row>
        <Divider orientation="left">支付</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
          <Col>
            <iframe srcDoc={formText} 
            width="600" 
            height="600"
            frameborder="no"
            border="0"
            marginwidth="0"
            marginheight="0"></iframe>
          </Col>
        </Row>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  pay: state.pay
});

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (pay) => {
      dispatch(createOrder(pay))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
