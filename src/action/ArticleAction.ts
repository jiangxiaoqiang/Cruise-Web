export function getArticle(article:any) {
  return {
      type: "GET_ARTICLE",
      article: article
  };
}

export function getRecommandArticles(article:any) {
  return {
      type: "GET_RECOMMAND_ARTICLES",
      article: article
  };
}

export function getOfficialArticles(article:any) {
  return {
      type: "GET_OFFICIAL_ARTICLES",
      article: article
  };
}

export function getOriginalArticles(article:any) {
  return {
      type: "GET_ORIGINAL_ARTICLES",
      article: article
  };
}

export function clearArticles() {
  return {
      type: "CLEAR_ARTICLES",
      article: []
  };
}

export function login(url:any) {
  return {
      type: "USER_LOGIN",
      redirectUrl: url
  };
}

