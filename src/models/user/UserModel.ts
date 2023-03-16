
import { REST } from 'js-wheel';

export interface IUserResponseState {
    data: API.ArticleListItem[],
    recommandArticle: API.ArticleListItem,
    pagination: REST.Pagination,
    maxOffset: number
}

export interface IUserModel {
    nickname: string,
    autoRenewProductExpireTimeMs: number
}

