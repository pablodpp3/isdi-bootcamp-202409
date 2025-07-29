import {
    registerUser,
    authenticateUser,
    getUserName
} from './users/index.js'

import {
    createPost,
    deletePost,
    getPosts,
    toggleLikePost,

    addComment,
    removeComment,
    getComments,
    savePost,
    getSavedPosts,
    removeFromFavourites
} from './posts/index.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,

    createPost,
    deletePost,
    getPosts,
    toggleLikePost,

    addComment,
    removeComment,
    getComments,
    savePost,
    getSavedPosts,
    removeFromFavourites
}

export default logic