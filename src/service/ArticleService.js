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
    const config = {
        method: 'get',
        url: '/post/article/newstories',
        headers: {'Content-Type': 'application/json'},
        params: params
    };
    return requestWithAction(config, getRecommandArticles);
}

export function getOfficialArticlesImpl(params) {
    const config = {
        method: 'get',
        url: '/post/article/officialstories',
        headers: {'Content-Type': 'application/json'},
        params: params
    };
    return requestWithAction(config, getOfficialArticles);
}

export function getOriginalArticlesImpl(params) {
    const config = {
        method: 'get',
        url: '/post/article/originalstories',
        headers: {'Content-Type': 'application/json'},
        params: params
    };
    return requestWithAction(config, getRecommandArticles);
}