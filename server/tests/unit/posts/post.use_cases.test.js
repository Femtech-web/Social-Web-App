import sinon from "sinon";
import { expect } from "chai";
import { faker } from "@faker-js/faker";

import posts from "../dummies/posts";
import addPost from '../../../src/application/use_cases/post/add';
import findAll from '../../../src/application/use_cases/post/findAll';
import findById from '../../../src/application/use_cases/post/findById';
import findBySearch from '../../../src/application/use_cases/post/findBySearch';
import likePostById from "../../../src/application/use_cases/post/likePostById";
import postDbRepository from '../../../src/application/repositories/postDbRepository';

let dbRepository = null;
let stubPost = null;
describe('Posts Uses cases', () => {
  beforeEach(() => {
    dbRepository = postDbRepository();
    stubPost = {
      _id: faker.database.mongodbObjectId(),
      creator: faker.database.mongodbObjectId(),
      name: faker.person.fullName(),
      title: faker.word.words({ count: 2 }),
      context: faker.word.words({ count: 10 }),
      tags: faker.helpers.multiple(faker.lorem.word, {count: 2}),
      selectedFile: faker.helpers.multiple(faker.image.url, {count: 1}),
      createdAt: faker.date.past()
    };
  });

  describe('Fetch a specific post', () => {
    it('should fetch a post by id', () => {
      const correspondingPost = {
        id: stubPost._id,
        creator: stubPost.creator,
        name: stubPost.name,
        title: stubPost.title,
        context: stubPost.title,
        tags: stubPost.tags,
        selectedFile: stubPost.selectedFile,
        createdAt: stubPost.createdAt
      };
      const stubRepo_FindById = sinon
        .stub(dbRepository, 'findById')
        .returns(correspondingPost);
      const fetchedPost = findById('5fb1b12a6ac3e23493ac82e4', dbRepository);

      expect(stubRepo_FindById.calledOnce).to.be.true;
      sinon.assert.calledWith(stubRepo_FindById,'5fb1b12a6ac3e23493ac82e4');
      expect(fetchedPost).to.equal(correspondingPost);
    });
  });

  describe('Fetch all posts', () => {
    it('should fetch all posts successfully', () => {
      const stubData = { data: [ 'post_one', 'post_two']};
      const stubRepo_findAll = sinon
        .stub(dbRepository, 'findAll')
        .returns(stubData);
      const params = {page: 1, perPage: 10, creator: '602c13e0cfe08b794e1b287b'};
      const fetchedPosts = findAll(params, dbRepository);

      expect(stubRepo_findAll.calledOnce).to.be.true;
      expect(fetchedPosts).to.equal(stubData);
    })
  });

  describe('Fetch by search', () => {
    it('should fetch all posts matching a searchTerm', () => {
      const stubData = { data: [ 'post1', 'post2' ]};
      const stubRepo_findBySearch = sinon
        .stub(dbRepository, 'findBySearch')
        .returns(stubData);
      const retrievedPosts = findBySearch('searchTerm', dbRepository);

      sinon.assert.calledWith(stubRepo_findBySearch, 'searchTerm');
      expect(stubRepo_findBySearch.calledOnce).to.be.true;
      expect(retrievedPosts).to.be.equal(stubData);
    });
  });

  describe('Add new post', () => {
    it('should add a new post successfully', () => {
      const persistedPost = {
        _id: stubPost._id,
        creator: stubPost.userId,
        title: stubPost.title,
        context: stubPost.context,
        name: stubPost.name,
        tags: stubPost.tags,
        selectedFile: stubPost.selectedFile,
        createdAt: stubPost.createdAt,
      };

      const stubRepo_addPost = sinon
        .stub(dbRepository, 'add')
        .returns(persistedPost);
      const newPost = addPost({
        userId: stubPost.creator,
        title: stubPost.title,
        context: stubPost.context,
        name: stubPost.name,
        tags: stubPost.tags,
        selectedFile: stubPost.selectedFile,
        createdAt: stubPost.createdAt,
        postRepository: dbRepository
      });

      expect(stubRepo_addPost.calledOnce).to.be.true;
      expect(newPost.creator).equals(persistedPost.creator);
      expect(newPost.title).equals(persistedPost.title);
      expect(newPost.name).equals(persistedPost.name);
    });
  });

  describe('Like a post', () => {
    it('should like a single post', async () => {
      const stubResponse = { message: 'post liked successfully'};
      const stubFoundPost = posts.single.success.body.data[0];
      const post_to_like = '5fb1ad6afb45c431a842c394';
      const userId = '5fb1ad6afb41c431a842c865';

      const stub_findById = sinon
        .stub(dbRepository, 'findById')
        .resolves(stubFoundPost);
      const stub_updatePost = sinon
        .stub(dbRepository, 'updateModifiedPost')
        .returns(stubResponse);
      const successful_response = await likePostById(post_to_like, userId, dbRepository);

      sinon.assert.calledWith(stub_updatePost, post_to_like, stubFoundPost);
      expect(stub_findById.calledOnce).to.be.true;
      expect(stub_updatePost.calledOnce).to.be.true;
      expect(successful_response).to.be.equal(stubResponse);
    });
  });
});
