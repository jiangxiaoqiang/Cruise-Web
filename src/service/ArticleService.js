/**
 * Created by jiangtingqiang(jiangtingqiang@gmail.com) on 2017-06-28.
 */

import { requestWithAction } from '../common/XHRClient';
import { getArticle,getRecommandArticles,getOfficialArticles } from "../action/ArticleAction";

export function getArticleImpl(id) {
    const config = {
        method: 'get',
        url: '/post/article/share?id=' + id,
    };
    return requestWithAction(config, getArticle);
}

export function getRecommandArticlesImpl(params) {
    let body = JSON.stringify(params);
    const config = {
        method: 'post',
        url: '/post/article/newstories',
        headers: {'Content-Type': 'application/json'},
        data: body
    };
    return requestWithAction(config, getRecommandArticles);
}

export function getOfficialArticlesImpl(params) {
    let body = JSON.stringify(params);
    const config = {
        method: 'post',
        url: '/post/article/officialstories',
        headers: {'Content-Type': 'application/json'},
        data: body
    };
    return requestWithAction(config, getOfficialArticles);
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