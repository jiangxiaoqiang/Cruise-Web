import { Typography } from "antd";
import React from "react";
const { Paragraph} = Typography;

const About: React.FC = (props) => {
  return (
    <Typography>
      <Paragraph>
        <span style={{ fontSize:17 }}>生活在这个时代，我们面对的不是信息的匮乏，而是信息的泛滥。各路推荐算法省去了筛选信息的成本，带来的结果是推荐的内容越来越“懂”你。很容易的就可以甚至于只看到符合自己口味的内容，但很多时候需要切换角度观察与思考。若不想被算法左右的太深，适当的切换一些资讯的接收方式。如果想自己遴选和掌控接收的内容，那么RSS可以一试。RSS是简易信息聚合（RSS：Really Simple Syndication）的缩写，对于用户来说，RSS是一种订阅机制，就像订报纸、杂志。通过这种订阅机制，您可以订阅喜欢的内容，例如：门户网站的新闻、个人的Blog、支持RSS的论坛帖子等等。微信的公众号本质上就是RSS机制，但微信公众号最大的问题是它封闭的生态。有价值的内容应该被尘封在图书馆里慢慢被遗忘不被世人所知还是尽量广泛传播造福人类？Cruise就是基于RSS的信息流。现实的情况是使用RSS的人越来越少，支持RSS的源也越来越少，高质量的RSS订阅源更是凤毛麟角。各路基于推荐算法的应用推出后，RSS的空间就更小了。在未来，我们想尽自己的能力聚合较为正式的、不那么Kill时间的信息流，我们想去掉一些标题党的文章，我们想聚合不同国家的信息流，我们也想聚合不同语言的信息流。</span>
      </Paragraph>
      <Paragraph>
        <span style={{ fontSize:17 }}>我们致力于提供不那么“娱乐”的信息流，同时尽力避免一些“标题党”类型的“爽文”，如果其中信息流侵犯了您的权益，请联系我们。</span>
        <ul style={{ fontSize:15 }}>
        <li>
          <div>邮箱：jiangtingqiang@gmail.com</div>
        </li>
        <li>
          <div><img style={{ height:'380px',width:'360px' }} src="/about/contact/WechatIMG260.jpeg"></img></div>
        </li>
      </ul>
      </Paragraph>
    </Typography>
  );
}

export default About;