import React, { useRef, useState } from "react";
import styles from './Panel.module.css';
import "@/scss/style.scss";
import pic from '@/resource/img/alipay-circle.png';
import { IUserModel } from "@/models/user/UserModel";
import { submitFeedback } from "@/service/user/FeedbackService";
import { withConnect } from "rd-component";

export type PanelProps = {
  panelUserInfo: IUserModel | undefined;
};

const Panel: React.FC<PanelProps> = (props: any) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [feedbackValue, setFeedbackValue] = useState('');

  function handleInputChange(event: any) {
    setFeedbackValue(event.target.value);
  }

  React.useEffect(() => {
    const menuItems: NodeListOf<HTMLDivElement> = document.querySelectorAll(`.${styles.menuItem}`);
    const pages: NodeListOf<HTMLDivElement> = document.querySelectorAll(`.${styles['panelContent']} > div`);
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        pages.forEach((page: HTMLDivElement) => {
          page.style.display = 'none';
        });
        const targetPageId = item.getAttribute('data-target');
        if (document) {
          document.getElementById(targetPageId!)!.style.display = 'block';
        }
      });
    });
    buttonRef.current!.click();
  }, [])

  const handleFeedback = () => {
    if (feedbackValue == null || feedbackValue.length == 0) {
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
    <div className={styles.panelContainer}>
      <div className={styles.panelMenu}>
        <div className={styles.menuItem} data-target="userinfo" id="userinfo-menu" ref={buttonRef}><span>用户信息</span></div>
        <div className={styles.menuItem} data-target="feedback"><span>意见与建议</span></div>
      </div>
      <div className={styles.panelContent}>
        <div id="userinfo" style={{ display: 'None' }}>
          <div title="基本信息" className="card" style={{ marginBottom: '20px' }}>
            <div className={`${styles.cheader} card-header`}>
              <div>基本信息</div>
            </div>
            <div style={{ marginTop: '10px', marginBottom: '20px' }}>
              <div ><span className="user-info">用户昵称</span></div>
              <div ><span className="user-info">{userInfo ? userInfo!.nickname : ""}</span></div>
              <div ></div>
            </div>
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
              <div ><span className="user-info">会员到期日</span></div>
              <div ><span className="user-info">{userInfo && userInfo.autoRenewProductExpireTimeMs ? userInfo.autoRenewProductExpireTimeMs : "--"}</span></div>
              <div ></div>
            </div>
          </div>
          <div className="card" title="登录凭据">
            <div className={`${styles.cheader} card-header`}>
              <div>登录凭据</div>
            </div>
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
              <div >
                <img style={{ height: '40px', width: '40px' }} src={pic}></img>
              </div>
              <div ><span>已绑定</span></div>
              <div ><span></span></div>
            </div>
          </div>
        </div>
        <div id="feedback" style={{ display: 'None' }}>
          <p>您可以反馈使用问题、建议，也可以发送想看的内容领域、信源给我们。</p>
          <div>
            <input onChange={handleInputChange} placeholder="请输入反馈内容"></input>
            <button onClick={handleFeedback} style={{ height: '40px', width: '120px' }} className="btn-primary">提交反馈</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withConnect(Panel);