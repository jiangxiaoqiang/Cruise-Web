import { Button, Card, Col, Divider, Row } from "antd";
import React, { useState } from "react";
import "./Pay.css"
import * as payService  from '../../service/pay/PayService';
import { connect } from "react-redux";

const Pay: React.FC = (props) => {

  const [selectedKey, setSelectedKey] = useState(null);

  React.useEffect(() => {
    
  }, []);
  const formText = props.pay.formText;

  const handleSelect = (key) => {
    setSelectedKey(key);
  };

  const handlePay = (event: React.MouseEvent) => {
    if(event.currentTarget){
      let productId = event.currentTarget.attributes.getNamedItem('data-param')?.value; // 输出自定义参数
      let params = {
        cruiseProductId: productId
      };
      payService.createQrCodeImpl(params);
    }
  };

  return (
    <div>
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
          <Col>
            <div className="container">
              <Card key="1" 
                    onClick={() => handleSelect(1)}
                    style={{border:
              selectedKey === 1 ? '2px solid blue' : '1px solid #f0f0f0'}}>
                <div className="card-content">
                  <div className="product">连续包年</div>
                  <span className="product-price">¥88</span>
                </div>
              </Card>
              <Button type="primary" 
              data-param={"1"} 
              onClick={(event)=>handlePay(event)}
              style={{
                display: selectedKey === 1?'inline':'None',marginTop:20
              }}>去支付</Button>
            </div>
          </Col>
          <Col>
            <div className="container">
              <Card key="2" 
                      onClick={() => handleSelect(2)}
                      style={{border:
                selectedKey === 2 ? '2px solid blue' : '1px solid #f0f0f0'}}>
                <div className="card-content">
                  <div className="product">连续包月</div>
                  <span className="product-price">¥9.9</span>
                </div>
              </Card>
              <Button type="primary"
              onClick={(event)=>handlePay(event)}
              data-param={"1"} 
               style={{
                display: selectedKey === 2?'inline':'None',marginTop:20
              }}>去支付</Button>
            </div>
          </Col>
          <Col>
            <div className="container">
              <Card key="3" 
                      onClick={() => handleSelect(3)}
                      style={{border:
                selectedKey === 3 ? '2px solid blue' : '1px solid #f0f0f0'}}>
                <div className="card-content">
                  <div className="product">1年</div>
                  <span className="product-price">¥99</span>
                </div>
              </Card>
              <Button type="primary" 
              onClick={(event)=>handlePay(event)}
              data-param={"1"} 
              style={{
                display: selectedKey === 3?'inline':'None',marginTop:20
              }}>去支付</Button>
            </div>
          </Col>
          <Col>
            <div className="container">
              <Card key="4" 
                      onClick={() => handleSelect(4)}
                      style={{border:
                selectedKey === 4 ? '2px solid blue' : '1px solid #f0f0f0'}}>
                <div className="card-content">
                  <div className="product">1月</div>
                  <span className="product-price">¥10.24</span>
                </div>
              </Card>
              <Button type="primary" 
              onClick={(event)=>handlePay(event)}
              data-param={"1"} 
              style={{
                display: selectedKey === 4?'inline':'None',marginTop:20
              }}>去支付</Button>
            </div>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
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
