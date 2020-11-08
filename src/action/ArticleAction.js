export function getArticle(article) {
  return {
      type: "GET_ARTICLE",
      article: article
  };
}