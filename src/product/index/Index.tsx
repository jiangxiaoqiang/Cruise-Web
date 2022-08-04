import React, { createContext, useContext, useEffect, useState } from 'react'
import { Col, Divider, Row, Tabs } from 'antd';
import 'antd/dist/antd.css';
import './Index.css';
import { connect } from 'react-redux';
import * as articleService  from '../../service/ArticleService';
import InfiniteScroll from 'react-infinite-scroll-component';

const { TabPane } = Tabs;
const onChange = (key: string) => {
  if(key === '1'){
    let params = {
      pageSize : 20,
      pageNum: 1
    };
    articleService.getRecommandArticlesImpl(params);
  }
  if(key === '2'){
    articleService.getOriginalArticlesImpl();
  }
};

const Index: React.FC = (props) => {

  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [offset, setOffset] = useState();
  const [localArticle, setLocalArticle] = useState(new Map<number, any>());

  let articles = props.article;

  React.useEffect(() => {
    let params = {
      pageSize : pageSize,
      pageNum: 1
    };
    articleService.getRecommandArticlesImpl(params);
  }, []);

  const renderArticles = () => {
    var array: API.ArticleListItem[] = articles?articles.list:[];
    var elements = new Map();
    if(array && array.length > 0) {
    array.forEach(article => {
      if(!localArticle.has(article.id)) {
        var articleDom: JSX.Element = (<div key={article.id}>
          <div style={{fontSize:15,fontWeight: 'bold'}}>
            <a href={article.link} target="_blank">{article.title}</a>
          </div>
          <Divider></Divider>
          </div>);
          elements.set(article.id, articleDom);
        }
      });
    }
    if(elements && elements.size > 0){
      debugger;
      setLocalArticle(new Map([...localArticle].concat([...elements])));
    }
  }

  var array: API.ArticleListItem[] = articles?articles.list:[];
  if(array){
    renderArticles();
  }
  
  const fetchData = () => {
    let newPageNum = pageNum + 1;
    let offset: number[] = Array.from(localArticle.keys())
    let params = {
      pageNum: newPageNum,
      pageSize: pageSize,
      offset: Math.max(...offset)
    };
    articleService.getRecommandArticlesImpl(params).then(()=>{
      setPageNum(newPageNum);
    });
    console.log("fetch data...");
  }

  const refresh = () => {
    console.log("refresh...");
  }

  const onScrollHandle = () => {
    console.log("refresh...");
  }

  let items: JSX.Element[] = Array.from(localArticle.values());
  if(items.length > 0) {
    // debugger
    console.log("items count:" + items.length);
  }
  

  return (
    <div>
      <Row justify="center">
        <Col span={10}>
          <Tabs defaultActiveKey="1" onChange={onChange} size="large" style={{ marginTop: 10 }}>
            <TabPane tab={<span style={{fontSize:18, fontWeight: 'bold'}}>编辑推荐</span>} key="1">
              <InfiniteScroll
                dataLength={localArticle.size} //This is important field to render the next data
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{textAlign: 'center'}}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                // below props only if you need pull down functionality
                refreshFunction={refresh}
                pullDownToRefresh
                pullDownToRefreshContent={
                  <h3 style={{textAlign: 'center'}}>↓ Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                  <h3 style={{textAlign: 'center'}}>↑ Release to refresh</h3>
                }>
                {items}
              </InfiniteScroll> 
            </TabPane>
            <TabPane tab={<span style={{fontSize:18, fontWeight: 'bold'}}>关于Cruise</span>} key="2">
              <div>
                
              </div>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
