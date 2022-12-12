import { Button, Typography } from "antd";
import React from "react";
const { Paragraph} = Typography;

const Footer: React.FC = (props) => {
  return (
    <div id="footer">
      <div>© 2022 重庆红矮星科技有限公司</div>
      <a>渝ICP备1700232号-6</a>
    </div>
  );
}

export default Footer;