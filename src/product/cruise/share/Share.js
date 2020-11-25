import { Component } from "react";
import { getArticle } from '../../../action/ArticleAction';
import { connect } from 'react-redux';
import { getArticleImpl } from '../../../service/ArticleService';

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

    return (
      <div className="App">
        <header className="App-header">
          fwfgwegwgwew
        </header>
          <div className="hello">
            <p>{article.title}</p>
          </div>
          <div>
            <div dangerouslySetInnerHTML={{ __html: article.content }}>
            </div>
          </div>
          <div>
            <button>打开</button>
            <div>固定在底部</div>
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
