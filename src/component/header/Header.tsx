import { Button, Typography } from "antd";
import React from "react";
const { Paragraph} = Typography;

const Header: React.FC = (props) => {
  return (
    <Typography>
      <Paragraph>
        <span style={{ fontSize:17 }}>生活在这个时代，我们面对的不是信息的匮乏，而是信息的泛滥。各路推荐算法省去了筛选信息的成本，带来的结果是推荐的内容越来越“懂”你。很容易的就可以甚至于只看到符合自己口味的内容。若需要适当的切换资讯的接收方式。如果想自己遴选和掌控接收的内容，那么RSS可以一试。RSS是简易信息聚合（RSS：Really Simple Syndication）的缩写，对于用户来说，RSS是一种订阅机制，就像订报纸、杂志。通过这种订阅机制，您可以订阅喜欢的内容，例如：门户网站的新闻、个人的Blog、支持RSS的论坛帖子等等。Cruise就是基于RSS。在这里，我们聚合较为正式的、不那么消磨时间的信息流，去掉一些标题党的文章，聚合不同国家的信息流，聚合不同语言的信息流。如果其中信息流侵犯了您的权益，请联系我们。邮箱：jiangtingqiang@gmail.com</span>
      </Paragraph>
      <Button>购买</Button>
    </Typography>
  );
}

export default Header;