import React, { createContext, useContext, useEffect } from 'react'
import { Col, Divider, Row, Tabs } from 'antd';
import 'antd/dist/antd.css';
import './Index.css';
import { connect } from 'react-redux';
import * as articleService  from '../../service/ArticleService';

const { TabPane } = Tabs;
const onChange = (key: string) => {
  if(key === '1'){
    articleService.getRecommandArticlesImpl();
  }
  if(key === '2'){
    articleService.getOriginalArticlesImpl();
  }
};

const Index: React.FC = (props) => {

  let articles = props.article;

  React.useEffect(() => {
    articleService.getRecommandArticlesImpl();
  }, []);

  const renderArticles = () => {
    var array: API.ArticleListItem[] = articles?articles.list:[];
    var element = [];
    if(array && array.length > 0) {
    array.forEach(article => {
      var article = (<div key={article.id}>
        <div style={{fontSize:15,fontWeight: 'bold'}}>
          <a href={article.link} target="_blank">{article.title}</a>
        </div>
        <Divider></Divider>
        </div>);
        element.push(article);
      });
    }
    return element;
  }

  return (
    <div>
      <Row justify="center">
        <Col span={10}>
          <Tabs defaultActiveKey="1" onChange={onChange} size="large" style={{ marginTop: 10 }}>
            <TabPane tab={<span style={{fontSize:18, fontWeight: 'bold'}}>推荐</span>} key="1">
              {renderArticles()}
            </TabPane>
            <TabPane tab={<span style={{fontSize:18, fontWeight: 'bold'}}>热门话题</span>} key="2">
              {renderArticles()}
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
