import React, { useState } from 'react'
import { Avatar, Button, Col, Divider, Dropdown, Menu, Row, Space, Spin, Tabs } from 'antd';
import './Index.css';
import { connect, RootStateOrAny } from 'react-redux';
import * as articleService  from '../../service/ArticleService';
import InfiniteScroll from 'react-infinite-scroll-component';
import About from '../about/About';
import { useSelector } from 'react-redux'
import { clearArticles, getArticle, getOfficialArticles, getRecommandArticles, login } from '../../action/ArticleAction';
import store from "../../store";
import TimeUtils from "js-wheel/dist/src/utils/time/time";
import Footer  from '../../component/footer/Footer';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Pay from '../pay/Pay';

const { TabPane } = Tabs;

const Index: React.FC = (props) => {

  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(20);
  const location = useLocation();
  const [offset, setOffset] = useState(new Map<string, number>());
  const [tabKey, setTabKey] = useState("1");
  const [localArticle, setLocalArticle] = useState(new Map<string, any>());
  let articles = useSelector((state: RootStateOrAny) => state.article);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);

  

  React.useEffect(() => {
    let params = {
      pageSize : pageSize,
      pageNum: 1
    };
    articleService.getRecommandArticlesImpl(params).then((data) => {
      setTabKey("1");
      if(offset.get('recommand')){
        return;
      }
      if(data && data.result){
        var ids = data.result.list.map((item: { id: number; }) => item.id);
        var newOffset = new Map();
        var maxId = Math.max(...ids);
        newOffset.set('recommand',maxId);
        setOffset(new Map([...offset].concat([...newOffset])))
      }
    });
  }, []);

  const onChange = (key: string) => {
    store.dispatch(clearArticles());
    fetchNewestArticles(key);
  };

  const userLogin =() => {
    articleService.userLoginAlipayImpl({}).then(data => {
      window.location.href=data.result;
    });
  }

  const fetchNewestArticles = (key: string) => {
    setPageNum(1);
    if(key === '1'){
      let params = {
        pageSize : 20,
        pageNum: 1,
        offset: offset.get('recommand')
      };
      articleService.getRecommandArticlesImpl(params).then((data) => {
        setTabKey("1");
        if(offset.get('recommand')){
          return;
        }
        if(data && data.result){
          var ids = data.result.list.map((item: { id: number; }) => item.id);
          var newOffset = new Map();
          var maxId = Math.max(...ids);
          newOffset.set('recommand',maxId);
          setOffset(new Map([...offset].concat([...newOffset])))
        }
      });
    }
    if(key === '2'){
      let params = {
        pageSize : 20,
        pageNum: 1,
        offset: offset.get('official')
      };
      articleService.getOfficialArticlesImpl(params).then((data) => {
        setTabKey("2");
        if(offset.get('official')){
          return;
        }
        if(data && data.result){
          var ids = data.result.list.map((item: { id: number; }) => item.id);
          var newOffset = new Map();
          var maxId = Math.max(...ids);
          newOffset.set('official',maxId);
          setOffset(new Map([...offset].concat([...newOffset])))
        }
      });
    }
    if(key === '3'){
      let params = {
        pageSize : 20,
        pageNum: 1,
        offset: offset.get('original')
      };
      articleService.getOriginalArticlesImpl(params).then((data) => {
        setTabKey("3");
        if(offset.get('original')){
          return;
        }
        if(data && data.result) {
          var ids = data.result.list.map((item: { id: number; }) => item.id);
          var newOffset = new Map();
          var maxId = Math.max(...ids);
          newOffset.set('original',maxId);
          setOffset(new Map([...offset].concat([...newOffset])))
        }
      });
    }
    if(key === '4'){
      setTabKey("4");
    }
  }

  const handleLogout=()=>{
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('cruiseAccessToken');
    localStorage.removeItem('avatarUrl');
    window.location.href="https://read.poemhub.top";
  }

  const handleCruisePro=()=>{
    setTabKey("5");
  }

  const menuItems = [
    <Menu.Item key="1"><span onClick={handleCruisePro}>Cruise Pro</span></Menu.Item>,
    <Menu.Item key="2"><span onClick={handleLogout}>登出</span></Menu.Item>
  ];

  const renderLogin=()=>{
    if(isLoggedIn){
      var avatarUrl = localStorage.getItem('avatarUrl');
      if(avatarUrl){
        return (<div>
          <Dropdown overlay={<Menu>{menuItems}</Menu>} trigger={['click']}>
            <Avatar size={40} src={avatarUrl} />
          </Dropdown>
          </div>);
      }else{
        return (<div>
          <Dropdown overlay={<Menu>{menuItems}</Menu>} trigger={['click']}>
            <Avatar size={40} >Me</Avatar>
          </Dropdown>
          </div>);
      }
    }
    const parsed = queryString.parse(location.search);
    if(parsed != null && parsed.access_token){
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('cruiseAccessToken', parsed.access_token);
      localStorage.setItem('avatarUrl',parsed.avatar_url);
      window.location.href="https://read.poemhub.top";
    }
    return (<div><Button onClick={userLogin}>登录</Button></div>);
  }

  const renderArticles = (articleArray: API.ArticleListItem[]) => {
    var elements = new Map();
    if(articleArray && articleArray.length > 0) {
      articleArray.forEach(article => {
      if(!localArticle.has(article.title)) {
        var articleDom: JSX.Element = (<div key={article.id}>
          <Row>
            <Col>
              <div style={{fontSize:15,fontWeight: 'bold'}}>
                <a href={article.link} target="_blank" rel="noreferrer">{article.title}</a>
              </div>
            </Col>
            <Col>
              <div style={{verticalAlign: 'middle',color:'#789',marginLeft:16,fontSize:13,fontWeight: '500'}}>{TimeUtils.getPrevFormattedTime(parseInt(article.createdTime))}</div>
            </Col>
          </Row>
          <Divider></Divider>
          </div>);
          elements.set(article.title, articleDom);
        }
      });
    }
    if(elements && elements.size > 0){
      setLocalArticle(new Map([...localArticle].concat([...elements])));
    }
  }

  var arrayArticles: API.ArticleListItem[] = articles&&articles.article?articles.article.list:[];
  if(arrayArticles){
    renderArticles(arrayArticles);
  }else{
    if(localArticle.size> 0){
      setLocalArticle(new Map<string, any>());
    }
  }

  const getArtcleKeys = (articles:any[]) =>{
    let keys:number[] = [];
    articles.forEach(article =>{
      let key = article.key;
      keys.push(parseInt(key));
    });
    return keys;
  }

  const fetchMoreData = (currentTabKey: string) => {
    if(currentTabKey !== tabKey){
      // prevent trigger the fetch more with the unactive infinite scroll
      // https://stackoverflow.com/questions/54711042/how-to-prevent-infinite-scroll-from-loading-pages-when-the-tab-is-not-active
      return;
    }
    let newPageNum = pageNum + 1;
    let articles =Array.from(localArticle.values()); 
    let offset: number[] = getArtcleKeys(articles);
    let params = {
      pageNum: newPageNum,
      pageSize: pageSize,
      offset: Math.max(...offset)
    };
    if(currentTabKey === "1"){
      articleService.getRecommandArticlesImpl(params).then(()=>{
        setPageNum(newPageNum);
      });
    }
    if(currentTabKey === "2"){
      articleService.getOfficialArticlesImpl(params).then(()=>{
        setPageNum(newPageNum);
      });
    }
    if(currentTabKey === "3"){
      articleService.getOriginalArticlesImpl(params).then(()=>{
        setPageNum(newPageNum);
      });
    }
  }

  const refreshArticles = () => {
    store.dispatch(clearArticles());
    fetchNewestArticles(tabKey);
  }

  let items: JSX.Element[] = Array.from(localArticle.values());

  const renderList = (items: JSX.Element[], currentTabKey: string) => {
    if(items.length === 0){
      return (<div><Spin /></div>);
    }
    return (<InfiniteScroll
      dataLength={localArticle.size} 
      next={fetchMoreData.bind(this,currentTabKey)}
      hasMore={true}
      loader={<h4><Spin /></h4>}
      endMessage={
        <p style={{textAlign: 'center'}}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      refreshFunction={refreshArticles}
      pullDownToRefresh={true}
      pullDownToRefreshContent={
        <h3 style={{textAlign: 'center'}}>↓ Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 style={{textAlign: 'center'}}>↑ Release to refresh</h3>
      }>
      {items}
    </InfiniteScroll>);
  }
  
  return (
    <div>
      <Row justify="center">
        <Col span={12}>
          <Tabs defaultActiveKey="1" onChange={onChange} size="large" style={{ marginTop: 10 }} activeKey={tabKey}>
            <TabPane tab={<span style={{fontSize:18, fontWeight: 'bold'}}>编辑推荐</span>} key="1">
              {renderList(items,"1")}
            </TabPane>
            <TabPane tab={<span style={{fontSize:18, fontWeight: 'bold'}}>权威资讯</span>} key="2">
              {renderList(items,"2")}
            </TabPane>
            <TabPane tab={<span style={{fontSize:18, fontWeight: 'bold'}}>原始资讯</span>} key="3">
              {renderList(items,"3")}
            </TabPane>
            <TabPane tab={<span style={{fontSize:18, fontWeight: 'bold'}}>关于Cruise</span>} key="4">
              <div>
                <About></About>
              </div>
            </TabPane>
            <TabPane tab={<span></span>} key="5">
              <div>
                <Pay></Pay>
              </div>
            </TabPane>
          </Tabs>
        </Col>
        <Col style={{ marginTop: 10 }}>
          {renderLogin()}
        </Col>
      </Row> 
      <Footer></Footer>
    </div>
  );
}

const mapStateToProps = state => ({
  article: state.article
});

const mapDispatchToProps = (dispatch) => {
  return {
    getArticle: (article) => {
      dispatch(getArticle(article))
    },
    getRecommandArticles: (article) => {
      dispatch(getRecommandArticles(article))
    },
    getOfficialArticles: (article) => {
      dispatch(getOfficialArticles(article))
    },
    login: (redirectUrl) => {
      dispatch(login(redirectUrl))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
