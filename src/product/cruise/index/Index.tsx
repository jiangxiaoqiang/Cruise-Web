import React, { useState } from 'react'
import { Avatar, Button, Col, Divider, Dropdown, Menu, Row, Spin } from 'antd';
import './Index.css';
import { connect, RootStateOrAny } from 'react-redux';
import * as articleService  from '../../../service/ArticleService';
import InfiniteScroll from 'react-infinite-scroll-component';
import About from '../about/About';
import { useSelector } from 'react-redux'
import { clearArticles, getArticle, getOfficialArticles, getRecommandArticles, login } from '@/action/ArticleAction';
import store from "../../../store";
import TimeUtils from "js-wheel/dist/src/utils/time/time";
import Footer  from '../../../component/footer/Footer';
import Pay from '../../pay/Pay';
import Panel from '../menu/panel/Panel';
import { doLoginOut, getCurrentUser } from '@/service/user/UserService';
import { PayCircleOutlined, ToolOutlined, LogoutOutlined } from '@ant-design/icons';


const Index: React.FC = (props) => {

  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(20);
  const [offset, setOffset] = useState(new Map<string, number>());
  const [tabKey, setTabKey] = useState("1");
  const [localArticle, setLocalArticle] = useState(new Map<string, any>());
  let articles = useSelector((state: RootStateOrAny) => state.article);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);

  React.useEffect(() => {
    tabsTrigger();
    loadCurrentUser();
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

  const loadCurrentUser = () => {
    if(!localStorage.getItem("userInfo") && isLoggedIn){
      getCurrentUser().then((data)=>{
        localStorage.setItem("userInfo",JSON.stringify(data.result));
      });
    }
  }

  const tabsTrigger = () => {
    // 绑定选项卡的点击事件
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function() {
            showTab(this.getAttribute("data-tab-index"));
        });
    }

    // 切换选项卡
    function showTab(index:number) {
      showTabImpl(index);
    }
  }

  const showTabImpl = (index: number) => {
    var tabContainers = document.getElementsByClassName("tab-content");
    // 隐藏所有选项卡的内容
    for (var i = 0; i < tabContainers.length; i++) {
      tabContainers[i].classList.remove("active");
    }

    // 显示当前选项卡的内容
    tabContainers[index].classList.add("active");

    // 将所有选项卡的样式重置为默认状态
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("active");
    }

    // 添加当前选项卡的样式
    tabs[index].classList.add("active");
    store.dispatch(clearArticles());
    fetchNewestArticles((Number(index)+1).toString());
  }

  const userLogin =() => {
    let params = {
      appId: "oloLNAXvJu"
    }
    articleService.userLoginAlipayImpl(params).then(data => {
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
    doLoginOut();
  }

  const handleControlPanel=()=>{
    showTabImpl(5);
  }

  const handleCruisePro=()=>{
    showTabImpl(4);
  }

  const menuItems = [
    <Menu.Item key="1" icon={<PayCircleOutlined />} style={{ fontSize: '16px' }}>
      <span onClick={handleCruisePro}>Cruise Pro</span>
    </Menu.Item>,
    <Menu.Item key="2" icon={<ToolOutlined />} style={{ fontSize: '16px' }}>
      <span onClick={handleControlPanel}>控制台</span>
    </Menu.Item>,
    <Menu.Item key="3" icon={<LogoutOutlined />} style={{ fontSize: '16px' }}>
      <span onClick={handleLogout}>登出</span>
    </Menu.Item>
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
    const accessTokenOrigin = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
    if(accessTokenOrigin){
      const accessTokenCookie = accessTokenOrigin.split("=")[1];
      const refreshTokenCookie = document.cookie.split('; ').find(row => row.startsWith('refreshToken='))?.split("=")[1];
      const avatarUrlCookie = document.cookie.split('; ').find(row => row.startsWith('avatarUrl='))?.split("=")[1];
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('cruiseAccessToken', accessTokenCookie);
      localStorage.setItem('cruiseRefreshToken', refreshTokenCookie?refreshTokenCookie:"");
      localStorage.setItem('avatarUrl',avatarUrlCookie?avatarUrlCookie:"");
      setIsLoggedIn(true);
    }
    return (<div><Button name='cruiseLoginBtn' onClick={userLogin}>登录</Button></div>);
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
          <b>没有更多</b>
        </p>
      }
      refreshFunction={refreshArticles}
      pullDownToRefresh={true}
      pullDownToRefreshContent={
        <h3 style={{textAlign: 'center'}}>↓下拉刷新</h3>
      }
      releaseToRefreshContent={
        <h3 style={{textAlign: 'center'}}>↑松开刷新</h3>
      }>
      {items}
    </InfiniteScroll>);
  }
  
  return (
	  <div className="container">
        <div className="left">
        </div>

        <div className="center">
            <div className="tab-container">
                <div className="tab active" data-tab-index="0">编辑推荐</div>
                <div className="tab" data-tab-index="1">权威资讯</div>
                <div className="tab" data-tab-index="2">原始资讯</div>
                <div className="tab" data-tab-index="3">关于Cruise</div>
                <div className="tab" data-tab-index="4"></div>
                <div className="tab" data-tab-index="5"></div>
                <div className="user-login" data-tab-index="">
                  {renderLogin()}
                </div>
            </div>

            <div className="tab-content-container">
                <div className="tab-content active" data-tab-index="0">
                  {renderList(items,"1")}
                </div>
                <div className="tab-content" data-tab-index="1">
                  {renderList(items,"2")}
                </div>
                <div className="tab-content" data-tab-index="2">
                  {renderList(items,"3")}
                </div>
                <div className="tab-content" data-tab-index="3">
                  <About></About>
                </div>
                <div className="tab-content" data-tab-index="4">
                  <div>
                    <Pay></Pay>
                  </div>
                </div>
                <div className="tab-content" data-tab-index="5">
                    <Panel></Panel>
                </div>
            </div>
            <Footer></Footer>
        </div>

        <div className="right">
        </div>
        
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
