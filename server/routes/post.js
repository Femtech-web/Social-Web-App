const express = require('express');

const { fetchPosts, fetchPost, fetchPostsBySearch, savePost, updatePost, deletePost, likePost, commentPost } = require('../controllers/post');
const { verifyToken, checkAuth, checkPostAuth } = require('../middlewares/utilities')

const router = express.Router();

router.get('/', fetchPosts);
router.get('/:id', verifyToken, checkPostAuth, fetchPost);
router.post('/search', verifyToken, fetchPostsBySearch);
router.post('/', verifyToken, checkAuth, savePost);
router.post('/likePost/:id', verifyToken, checkPostAuth, likePost);
router.post('/commentPost/:id', verifyToken, checkPostAuth, commentPost);
router.patch('/:id', verifyToken, checkPostAuth, updatePost);
router.delete('/:id', verifyToken, checkPostAuth, deletePost)

module.exports = router;