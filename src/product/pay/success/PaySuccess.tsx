import React from "react";
import { connect } from "react-redux";
import "./PaySuccess.css"
import queryString from 'query-string';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';

const PaySuccess: React.FC = (props) => {

    const location = useLocation();

    const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

    const parsed = queryString.parse(location.search);
    if(parsed != null && parsed.access_token){
      return (<div className="container">
      <h1>支付成功！</h1>
      <p>您的订单已经成功支付。</p>
      <p>订单号：{parsed.orderId}</p>
      <p>支付金额：${parsed.totalAmount}</p>
      <p>支付时间：{currentTime}</p>
  </div>);
    }else{
        return (<div className="container">
            <h1>支付失败！</h1>
        </div>);
    }
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
  
export default connect(mapStateToProps, mapDispatchToProps)(PaySuccess);
  
