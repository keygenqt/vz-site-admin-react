import articles from "./impl/articles";
import article from "./impl/article";
import articleCreate from "./impl/articleCreate";
import articleUpdate from "./impl/articleUpdate";

export const MethodsPS = {
    // get list
    articles: articles,
    // get by id
    article: article,
    // add article
    articleCreate: articleCreate,
    // update article
    articleUpdate: articleUpdate,
}
