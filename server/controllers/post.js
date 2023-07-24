const mongoose = require('mongoose');
const Post = require('../models/post');

const fetchPosts = async (req, res) => {
    const allPosts = await Post.find().sort({_id: -1});

    res.status(200).json(allPosts);
}

const fetchPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
    }
}

const fetchPostsBySearch = async (req, res) => {
    const { query } = req.query;

    const title = new RegExp(query, 'i')

    try {
        const searchedPosts = await Post.find({$or: [ {title}, {tags: {$in: [title]}} ] }).sort({_id: -1});
        res.status(200).json(searchedPosts)
    } catch (error) {
        console.log(error);
    }

}

const savePost = async (req, res) => {
    const body = req.body; 

    const newPost = new Post({creator: req.userId, createdAt: new Date().toISOString(), selectedFile: body.img, ...body})
    
    try {
        await newPost.save()

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: 'An error ocurred'})
    }

}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    const existingPost = await Post.findById(id);

    if(!existingPost){
        res.status(404).json({message: 'Post not found!'});
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, {...post, id}, { new: true });
        res.status(200).json(updatedPost)
    } catch (error) {
        console.log(error);
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    const existingPost = await Post.findById(id);

    if(!existingPost){
        res.status(404).json({message: 'Post not found!'});
    }

    try {
        await Post.findByIdAndRemove(id)
        res.json({message: 'post deleted successfully'});
    } catch (error) {
        console.log(error);
    }

}

const likePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        const index = post.likes.findIndex((_id) => _id === req.userId);
    
        if(index === -1){
            post.likes.push(req.userId);
        }else{
            post.likes = post.likes.filter((_id) => _id !== req.userId)
        }
    
        const updatedPost = await Post.findByIdAndUpdate(id, post, { new:true })
        res.status(200).json(updatedPost)
    } catch (error) {
        console.log(error);   
    }
}

const commentPost = async(req, res) => {
    const { id } = req.params;
    const { finalComment } = req.body;

    try {
        const post = await Post.findById(id);
    
        post.comments.push(finalComment)
        const updatedPost = await Post.findByIdAndUpdate(id, post, { new:true })
        res.status(200).json(updatedPost)
    } catch (error) {
        console.log(error);
    }
}

module.exports = { fetchPosts, fetchPost, fetchPostsBySearch, 
savePost, updatePost, deletePost, likePost, commentPost };