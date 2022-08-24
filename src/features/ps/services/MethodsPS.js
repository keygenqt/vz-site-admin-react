import articles from "./impl/articles/articles";
import article from "./impl/articles/article";
import articleCreate from "./impl/articles/articleCreate";
import articleUpdate from "./impl/articles/articleUpdate";
import projects from "./impl/projects/projects";
import project from "./impl/projects/project";
import projectCreate from "./impl/projects/projectCreate";
import projectUpdate from "./impl/projects/projectUpdate";
import uploadFile from "./impl/files/uploadFile";
import deleteFile from "./impl/files/deleteFile";

export const MethodsPS = {
    //////////////////////
    // Articles
    // get list
    articles: articles,
    // get by id
    article: article,
    // add article
    articleCreate: articleCreate,
    // update article
    articleUpdate: articleUpdate,

    //////////////////////
    // Projects
    // get list
    projects: projects,
    // get by id
    project: project,
    // add article
    projectCreate: projectCreate,
    // update article
    projectUpdate: projectUpdate,

    //////////////////////
    // Files
    // upload
    uploadFile: uploadFile,
    // delete
    deleteFile: deleteFile,
}
