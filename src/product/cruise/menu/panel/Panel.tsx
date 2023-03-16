import { Avatar, Button, Card, Col, Input, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import './Panel.css';
import pic from '@/resource/img/alipay-circle.png';
import { connect } from "react-redux";
import { getCurrentUserAction } from "@/action/user/UserAction";
import { IUserModel } from "@/models/user/UserModel";
import { submitFeedback } from "@/service/user/FeedbackService";

export type PanelProps = {
  panelUserInfo: IUserModel|undefined;
};

const Panel: React.FC<PanelProps> = (props:any) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [feedbackValue, setFeedbackValue] = useState('');

  function handleInputChange(event:any) {
    setFeedbackValue(event.target.value);
  }

  React.useEffect(() => {
		const menuItems = document.querySelectorAll('.menu-item');
		const pages = document.querySelectorAll('.panel-content > div');
		menuItems.forEach(item => {
			item.addEventListener('click', (e) => {
				pages.forEach(page => {
					page.style.display = 'none';
				});
				const targetPageId = item.getAttribute('data-target');
        
        if(document){
				  document.getElementById(targetPageId!)!.style.display = 'block';
        }
			});
		});
    buttonRef.current!.click();
  },[])

  const handleFeedback = () => {
    if(feedbackValue==null||feedbackValue.length==0) {
      return;
    }
    const params = {
      feedback: feedbackValue
    };
    submitFeedback(params).then((data) => {
      alert(data.msg);
    });
  }

  const userInfo = props.panelUserInfo;

  return (
    <div className="panel-container">
      <div className="panel-menu">
        <div className="menu-item" data-target="userinfo" id="userinfo-menu" ref={buttonRef}><span>用户信息</span></div>
         <div className="menu-item" data-target="feedback"><span>意见与建议</span></div>
      </div>
      <div className="panel-content">
        <div id="userinfo" style={{display:'None'}}>
          <Card title="基本信息" style={{ marginBottom: '20px' }}>
            <Row style={{ marginTop: '10px', marginBottom: '20px' }}>
              <Col span={8}><span className="user-info">用户昵称</span></Col>
              <Col span={8}><span className="user-info">{userInfo?userInfo!.nickname:""}</span></Col>
              <Col span={8}></Col>
            </Row>
            <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
              <Col span={8}><span className="user-info">会员到期日</span></Col>
              <Col span={8}><span className="user-info">{userInfo&&userInfo.autoRenewProductExpireTimeMs?userInfo.autoRenewProductExpireTimeMs:"--"}</span></Col>
              <Col span={8}></Col>
            </Row>
          </Card>
          <Card title="登录凭据">
            <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
              <Col span={8}>
                <Avatar src={pic}></Avatar>
              </Col>
              <Col span={8}><span>已绑定</span></Col>
              <Col span={8}><span></span></Col>
            </Row>
          </Card>
        </div>
        <div id="feedback" style={{display:'None'}}>
          <p>您可以反馈使用问题、建议，也可以发送想看的内容领域、信源给我们。</p>
          <div>
            <Input onChange={handleInputChange} placeholder="请输入反馈内容"></Input>
            <Button onClick={handleFeedback} className="feedback-submit">提交反馈</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state:any) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch:any) => {
  return {
    getCurrentUser: (user:any) => {
      dispatch(getCurrentUserAction(user))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);

