/**
 * Created by jiangtingqiang(jiangtingqiang@gmail.com) on 2017-06-28.
 */

import { requestWithAction } from '../common/XHRClient';
import { getArticle,getRecommandArticles } from "../action/ArticleAction";

export function getArticleImpl(id) {
    const config = {
        method: 'get',
        url: '/post/article/share?id=' + id,
    };
    return requestWithAction(config, getArticle);
}

export function getRecommandArticlesImpl() {
    const config = {
        method: 'post',
        url: '/post/article/newstories',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({})
    };
    return requestWithAction(config, getRecommandArticles);
}

export function getOriginalArticlesImpl() {
    const config = {
        method: 'post',
        url: '/post/article/originalstories',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({})
    };
    return requestWithAction(config, getRecommandArticles);
}