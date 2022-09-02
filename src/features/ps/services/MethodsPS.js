import articles from "./impl/articles/articles";
import article from "./impl/articles/article";
import articleCreate from "./impl/articles/articleCreate";
import articleUpdate from "./impl/articles/articleUpdate";
import projects from "./impl/projects/projects";
import project from "./impl/projects/project";
import projectCreate from "./impl/projects/projectCreate";
import projectUpdate from "./impl/projects/projectUpdate";
import uploadFile from "./impl/files/uploadFile";
import uploadFiles from "./impl/files/uploadFiles";
import deleteFile from "./impl/files/deleteFile";
import projectsInfo from "./impl/dashboard/projectsInfo";
import articlesInfo from "./impl/dashboard/articlesInfo";
import followersInfo from "./impl/dashboard/followersInfo";
import publicReposInfo from "./impl/dashboard/publicReposInfo";
import reposTypes from "./impl/dashboard/reposTypes";
import reposPopular from "./impl/dashboard/reposPopular";
import connects from "./impl/connects/connects";
import connectUpdate from "./impl/connects/connectUpdate";

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
    // uploads
    uploadFiles: uploadFiles,
    // upload
    uploadFile: uploadFile,
    // delete
    deleteFile: deleteFile,

    //////////////////////
    // Dashboard
    // Get info about projects
    projectsInfo: projectsInfo,
    // Get info about articles
    articlesInfo: articlesInfo,
    // Get info about GitHub followers
    followersInfo: followersInfo,
    // Get info about GitHub repos
    publicReposInfo: publicReposInfo,
    // Get info about GitHub repos by month
    reposTypes: reposTypes,
    // Get list GitHub repos mast popular
    reposPopular: reposPopular,

    //////////////////////
    // Connects
    // Get list connects
    connects: connects,
    // Update connect
    connectUpdate: connectUpdate,
}
