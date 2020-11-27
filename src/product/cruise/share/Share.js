import { Component } from "react";
import { getArticle } from '../../../action/ArticleAction';
import { connect } from 'react-redux';
import { getArticleImpl } from '../../../service/ArticleService';
import './Share.css';
import DOMPurify from 'dompurify';


class Share extends Component{

  constructor(props) {
    super(props);
    this.state = this.process();
  }

  process() {
    const id = this.props.match.params.id;
    getArticleImpl(id);
  }

  render(){
    const article = this.props.article;
    if(!article){
      return (
        <div>
          无内容
        </div>
      );
    }

    var clean = DOMPurify.sanitize(article.content);

    return (
      <div className="App">
        <header className="App-header">
          fwfgwegwgwew
        </header>
          <div className="title">
            <p>{article.title}</p>
          </div>
          <div className="content">
            <div className="html" dangerouslySetInnerHTML={{ __html: clean}}>
              
            </div>
          </div>
          <div className="fixed">
            <div className="slogan">打开Cruise阅读体验更佳</div>
            <div className="open">打开</div>
          </div>
      </div>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Share);
