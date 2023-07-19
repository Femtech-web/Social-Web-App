const express = require('express');

const { fetchPosts, fetchPost, fetchPostsBySearch, savePost, updatePost, deletePost, likePost, commentPost } = require('../controllers/post');
const { verifyToken } = require('../middlewares/utilities')

const router = express.Router();

router.get('/', fetchPosts);
router.get('/:id', verifyToken, fetchPost);
router.post('/search', verifyToken, fetchPostsBySearch);
router.post('/', verifyToken, savePost);
router.post('/likePost/:id', verifyToken, likePost);
router.post('/commentPost/:id', verifyToken, commentPost);
router.patch('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost)

module.exports = router;