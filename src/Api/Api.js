import axios from 'axios';

const api = 'http://202.31.202.28:443/api';

const getRequest = async(path, params = {}) => {
    try {
        const token = sessionStorage.getItem('user_token');
        const response = await axios.get(api + path, {
            headers: {
                authorization: `Bearer ${token}`,
                Accept: '*/*'
            },
            params
        });
        return response;
    } catch (e) {
        console.log(e);
        return [];
    }
};

const postFormReqest = async(path, body) => {
    try {
        const token = sessionStorage.getItem('user_token');
        const { data } = await axios.post(api + path, body, {
            headers: {
                authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    } catch (e) {
        console.log(e);
    }
};

const postJsonReqest = async(path, body) => {
    try {
        const token = sessionStorage.getItem('user_token');
        if (token) {
            const { data } = await axios.post(api + path, body, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return data;
        } else {
            const { data } = await axios.post(api + path, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return data;
        }
    } catch (e) {
        console.log(e);
    }
};

const putJsonReqest = async(path, body) => {
    try {
        const token = sessionStorage.getItem('token');
        if (token) {
            const { data } = await axios.put(api + path, body, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return data;
        } else {
            const { data } = await axios.put(api + path, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return data;
        }
    } catch (e) {
        console.log(e);
    }
};

const deleteJsonReqest = async(path) => {
    try {
        const token = sessionStorage.getItem('user_token');
        if (token) {
            const { data } = await axios.delete(api + path, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return data;
        } else {
            const { data } = await axios.delete(api + path, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return data;
        }
    } catch (e) {
        console.log(e);
    }
};

const Api = {
    // ????????? ???????????? ??????
    emailCode: null,
    // ??? ???????????? ????????? ????????? ??????
    pageCount: 6,

    //Auth---------------------------------------------------------------------------
    // ?????????
    postLogin: async(user_login_id, user_password) => {
        return await postJsonReqest('/auth/login', {
            user_login_id,
            user_password
        });
    },
    // ????????????
    getLogout: async() => {
        return await getRequest('/auth/logout');
    },
    // ????????? ?????? ??????
    getDoubleCheckId: async(loginId) => {
        return await getRequest('/auth/doubleId', { loginId });
    },
    // ????????? ?????? ?????? ??????
    getEmail: async(email) => {
        return await getRequest('/auth/email', { email });
    },
    // ???????????? ????????? ????????? ?????? ??????
    getResetPasswordEmail: async(email) => {
        return await getRequest('/auth/email/password', { email });
    },
    // ????????? ?????? ?????? ??????
    postEmail: async(emailId, authStr) => {
        return await postJsonReqest('/auth/email', { emailId, authStr });
    },
    // ???????????? ?????????
    postPassword: async(loginId, changePassword) => {
        return await postJsonReqest('/auth/password', { loginId, changePassword });
    },

    // User--------------------------------------------------------------------------
    // ????????????
    postUser: async(user_data) => {
        return await postJsonReqest('/user', user_data);
    },
    // ???????????? ??????
    postUpdateUser: async(
        userId,
        user_image,
        user_introduction,
        user_github,
        user_blog,
        user_position
    ) => {
        return await postJsonReqest(`/user/${userId}`, {
            user_image,
            user_introduction,
            user_github,
            user_blog,
            user_position
        });
    },
    // ???????????? ??????
    getReaduser: async(userId) => {
        return await getRequest(`/user/${userId}`);
    },
    // ????????? LoginId??????
    getUserLoginId: async(loginId) => {
        return await getRequest('/user/search/loginId', { loginId });
    },
    // ????????? ????????? ??????
    getProfessors: async() => {
        return await getRequest('/user/professors');
    },
    // ????????? ?????? ???????????? ????????? ??????
    getProjectInUser: async(userId, pageNum, pageCount) => {
        return await getRequest(`/user/${userId}/projects`, { pageNum, pageCount });
    },
    // ?????? ????????? ??????????????? ??????
    getUserRecruitment: async(userId, pageNum, pageCount) => {
        return await getRequest(`/user/${userId}/recruitment`, {
            pageNum,
            pageCount
        });
    },
    // ?????? ??????
    deleteUser: async(userId) => {
        return await deleteJsonReqest(`/user/${userId}`);
    },

    // Projects--------------------------------------------------------------------------------
    // ???????????? ??????
    postProject: async(project) => {
        return await postJsonReqest('/project', project);
    },
    // ???????????? ??????
    postUpdateProject: async(projectId, project) => {
        return await postJsonReqest(`/project/${projectId}`, project);
    },
    // ???????????? ????????????
    getProject: async(projectId) => {
        return await getRequest(`/project/${projectId}`);
    },
    // ???????????? ????????????
    getAllProject: async(pageNum, pageCount) => {
        return await getRequest('/project', { pageNum, pageCount });
    },
    // ?????? ???????????? ?????? ??????
    getAllProjectCount: async() => {
        return await getRequest('/project-count');
    },
    // ???????????? ????????? ??????
    getHit: async(projectId) => {
        return await getRequest(`/project/${projectId}/hit`);
    },
    // ???????????? ?????? ???????????? ????????? ??????
    getStacks: async() => {
        const stack = await getRequest('/project/tags');
        return await getRequest('/project/tags');
    },
    // ???????????? ???????????? ????????? ??????
    getCategorys: async() => {
        return await getRequest('/project/categorys');
    },
    // ???????????? ???????????? ????????? ??????
    getYears: async() => {
        return await getRequest('/project/subject-years');
    },
    // ???????????? ??????????????? ??????
    getSubjects: async() => {
        return await getRequest('/project/subjects');
    },
    // ???????????? ?????? ?????? ??????
    getMenus: () => {
        return ['?????????', '????????????', '?????????'];
    },
    // ???????????? ?????? ??????
    getProjectTags: async(tagId) => {
        return await getRequest(`/project/search/tag?tagId=${tagId}`);
    },
    // ??????????????? ???????????? ??????
    getProjectInCategory: async(categoryId, pageNum, pageCount) => {
        const response = await getRequest('/project/search/category', {
            categoryId,
            pageNum,
            pageCount
        });
        return response.data;
    },
    // ???????????? ??????
    postProjectSearch: async(pageNum, pageCount, project) => {
        return await postJsonReqest(
            `/project/search/?pageNum=${pageNum}&pageCount=${pageCount}`,
            project
        );
    },
    // ???????????? ??????
    deleteProject: async(projectId) => {
        return await deleteJsonReqest(`/project/${projectId}`);
    },

    // Follow------------------------------------------------------------------------------------
    // ?????????
    getFollow: async(targetId) => {
        return await getRequest('/user/follow', { targetId });
    },
    // ????????? ??????
    getUnfollow: async(targetId) => {
        return await getRequest('/user/unfollow', { targetId });
    },
    // ????????? ????????? ??????
    getFollowerList: async(userId) => {
        return await getRequest(`/user/${userId}/followers`);
    },
    // ????????? ????????? ??????
    getFollowingList: async(userId) => {
        return await getRequest(`/user/${userId}/followings`);
    },

    // likes------------------------------------------------------------------------------------
    // ???????????? ????????? ?????? ??????
    getProjectIsLike: async(projectId) => {
        return await getRequest('/project/isLike', { projectId });
    },
    // ???????????? ?????????
    getProjectLike: async(projectId) => {
        return await getRequest('/project/like', { projectId });
    },
    // ???????????? ????????? ??????
    getProjectUnlike: async(projectId) => {
        return await getRequest('/project/unlike', { projectId });
    },
    // ???????????? ???????????? ???????????? ????????? ??????
    getLikedProject: async(userId, pageNum, pageCount) => {
        return await getRequest(`/user/${userId}/like-projects`, {
            pageNum,
            pageCount
        });
    },
    // Posts------------------------------------------------------------------------------------
    // ????????? ??????
    getCreatePosting: async(projectId, post_title, post_content) => {
        return await postJsonReqest(`/project/${projectId}/post`, {
            post_title,
            post_content
        });
    },

    // ????????? ??????
    postUpdatePosting: async(projectId, postId, postObject) => {
        return await postJsonReqest(
            `/project/${projectId}/post/${postId}`,
            postObject
        );
    },
    // ????????? ?????? -> ?????? ?????? X
    deletePosting: async(projectId, postId) => {
        return await deleteJsonReqest(`/project/${projectId}/post/${postId}`);
    },
    // ????????? ??????
    getReadPosting: async(projectId, postId) => {
        return await getRequest(`/project/${projectId}/post/${postId}`);
    },
    // ????????? ?????? ??????
    getPostingList: async(projectId) => {
        return await getRequest(`/project/${projectId}/post-list`);
    },
    // Comments-----------------------------------------------------------------------------------
    // ??????????????? ?????? / ????????? ??????
    postComment: async(
        projectId,
        comment_content,
        comment_depth,
        comment_parent
    ) => {
        return await postJsonReqest(`/project/${projectId}/comment`, {
            comment_content,
            comment_depth,
            comment_parent
        });
    },
    // ??????????????? ?????? / ????????? ??????
    postUpdateComment: async(projectId, commentId, comment_content) => {
        return await postJsonReqest(`/project/${projectId}/comment/${commentId}`, {
            comment_content
        });
    },
    // ??????????????? ?????? / ????????? ??????
    deleteComment: async(projectId, commentId) => {
        return await deleteJsonReqest(`/project/${projectId}/comment/${commentId}`);
    },
    // ??????????????? ?????? / ????????? ??????
    getReadComment: async(projectId) => {
        return await getRequest(`/project/${projectId}/comment/`);
    },
    // Files--------------------------------------------------------------------------------------
    getReadFile: async(fileData) => {
        return await postFormReqest(`/file/upload`, fileData);
    },
    getReadFilePDF: async(fileData) => {
        return await postFormReqest(`/file/uploadPDF`, fileData);
    },
    // Recruitment--------------------------------------------------------------------------------
    postTeam: async(Team) => {
        return await postJsonReqest('/recruitment', Team);
    },
    getAllTeam: async(pageNum, pageCount) => {
        const response = await getRequest('/recruitment', { pageNum, pageCount });
        return response.data;
    },
    getTeam: async(Teamid) => {
        return await getRequest(`/recruitment/${Teamid}`);
    },

    getTeamEnd: async(Teamid) => {
        return await getRequest(`/recruitment/${Teamid}/end`);
    },
    getTeamApplication: async(Teamid) => {
        return await getRequest(`/recruitment/${Teamid}/application`);
    },

    postTeamUpdate: async(Teamid, Team) => {
        return await postJsonReqest(`/recruitment/${Teamid}`, Team);
    },
    deleteTeam: async(Teamid) => {
        return await deleteJsonReqest(`/recruitment/${Teamid}`);
    },
    getSearch: async(pageNum, pageCount, keyword, subject) => {
        const response = await getRequest(
            `/recruitment/search?pageNum=${pageNum}&pageCount=${pageCount}&keyword=${keyword}&subject=${subject}`
        );
        return response.data;
    },
    getTeamcancelApplication: async(Teamid) => {
        return await deleteJsonReqest(`/recruitment/${Teamid}/application`);
    },
    getTeamList: async(Teamid) => {
        return await getRequest(`/recruitment/${Teamid}/application-list`);
    },
    getisApplication: async(Teamid) => {
        return await getRequest(`/recruitment/${Teamid}/isApplication`);
    },
    getOK: async(Teamid, array) => {
        return await getRequest(`/recruitment/${Teamid}/accept?userId=${array}`);
    },
    getRefuse: async(Teamid, array) => {
            return await getRequest(`/recruitment/${Teamid}/refuse?userId=${array}`);
        }
        // Notification?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
};

export default Api;