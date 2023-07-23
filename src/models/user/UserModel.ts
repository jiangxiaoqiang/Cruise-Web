
import { Pagination } from 'rdjs-wheel';

export interface IUserResponseState {
    data: API.ArticleListItem[],
    recommandArticle: API.ArticleListItem,
    pagination: Pagination,
    maxOffset: number
}

export interface IUserModel {
    nickname: string,
    autoRenewProductExpireTimeMs: number
}

