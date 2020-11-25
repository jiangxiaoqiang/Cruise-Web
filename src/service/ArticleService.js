/**
 * Created by jiangtingqiang(jiangtingqiang@gmail.com) on 2017-06-28.
 */

import { requestWithAction } from '../common/XHRClient';
import { getArticle } from "../action/ArticleAction";
import globalConfig from "../global.config.json";

export function getArticleImpl(id) {
    const config = {
        method: 'get',
        url: globalConfig.apiServerUrl + '/post/article/share/' + id,
    };
    return requestWithAction(config, getArticle);
}