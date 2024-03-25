import sinon from "sinon";
import { expect } from "chai";
import { faker } from "@faker-js/faker";

import add from "../../../src/application/use_cases/user/add";
import login from "../../../src/application/use_cases/auth/login";
import findById from "../../../src/application/use_cases/user/findById";
import findByProperty from "../../../src/application/use_cases/user/findByProperty";
import userRepository from "../../../src/application/repositories/userDbRepository";
import authServiceInterface from "../../../src/application/services/authServiceInterface";

let dbRepository = null;
let authService = null;
let stubUser = null;
describe('Users Uses cases', () => {
  beforeEach(() => {
    dbRepository = userRepository();
    authService = authServiceInterface();
    stubUser = {
      _id: faker.database.mongodbObjectId(),
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'USER',
      createdAt: faker.date.past()
    };
  });

  describe('Fetch a specific user', () => {
    it('should fetch a user by id', () => {
      const correspondingUser = {
        id: stubUser._id,
        fullname: stubUser.fullname,
        email: stubUser.email,
        password: stubUser.password,
        role: stubUser.role,
        createdAt: stubUser.createdAt
      };
      const stubRepo_FindById = sinon
        .stub(dbRepository, 'findById')
        .returns(correspondingUser);
      const fetchedPost = findById('5fb1b12a6ac3e23493ac82e4', dbRepository);

      expect(stubRepo_FindById.calledOnce).to.be.true;
      sinon.assert.calledWith(stubRepo_FindById,'5fb1b12a6ac3e23493ac82e4');
      expect(fetchedPost).to.equal(correspondingUser);
    });
  });

  describe('Fetch all users', () => {
    it('should fetch all users successfully', () => {
      const stubData = { data: [ 'user one', 'user two']};
      const stubRepo_findAll = sinon
        .stub(dbRepository, 'findByProperty')
        .returns(stubData);
      const params = {page: 1, perPage: 10};
      const fetchedPosts = findByProperty(params, dbRepository);

      expect(stubRepo_findAll.calledOnce).to.be.true;
      expect(fetchedPosts).to.equal(stubData);
    })
  });

  describe('Add new user', () => {
    it('should add a new user successfully', async () => {
      const persistedUser = {
        _id: stubUser._id,
        fullname: stubUser.fullname,
        email: stubUser.email,
        password: stubUser.password,
        role: stubUser.role,
        createdAt: stubUser.createdAt
      };

      // The fake password to be returned by createHashedPassword method
      const stubPassword = faker.internet.password();
      // stub the createHashedPassword method to return a fake
      const stub_createHashedPassword = sinon
        .stub(authService, 'createHashedPassword')
        .resolves(stubPassword);
      // stub the findByProperty method to return an empty array
      const stub_findUser = sinon
        .stub(dbRepository, 'findByProperty')
        .resolves([]);
      // stub the add method to return the persisted stub user
      const stubRepo_addUser = sinon
        .stub(dbRepository, 'add')
        .returns(persistedUser);
      // call the add use_case method 
      const newUser = await add(
        stubUser.fullname,
        stubUser.password,
        stubUser.email ,
        stubUser.role,
        stubUser.createdAt,
        dbRepository,
        authService
      );

      sinon.assert.calledWith(stub_createHashedPassword, persistedUser.password);
      sinon.assert.calledWith(stub_findUser, { email: persistedUser.email })
      expect(stubRepo_addUser.calledOnce).to.be.true;
      expect(newUser.email).to.equal(persistedUser.email);
      expect(newUser.fullname).to.equal(persistedUser.fullname);
    })
  });

  describe('Login a user', () => {
    it('should login a user successfully', async () => {
      const persistedLoggedInUser = {
        signedToken: faker.string.alphanumeric({ length: 200}),
        user: {
          _id: stubUser._id,
          fullname: stubUser.fullname,
          email: stubUser.email,
          password: stubUser.password,
          role: stubUser.role,
          createdAt: stubUser.createdAt
        }
      };

      const stub_findUser = sinon
        .stub(dbRepository, 'findByEmail')
        .resolves(persistedLoggedInUser.user);

      const stub_comparPasswords = sinon
        .stub(authService, 'comparePasswords')
        .resolves(true);
      const stub_generateToken = sinon
        .stub(authService, 'generateToken')
        .returns(persistedLoggedInUser.signedToken);
      const loggedInUser = await login(
        stubUser.email, 
        stubUser.password, 
        dbRepository, 
        authService
      );

      const { password, email, _id } = persistedLoggedInUser.user;
      const payload = {
        user: {
          id: _id,
          email: email,
        },
      };
      sinon.assert.calledWith(stub_comparPasswords, password, stubUser.password);
      sinon.assert.calledWith(stub_generateToken, payload);
      sinon.assert.calledWith(stub_findUser, stubUser.email);
      expect(stub_comparPasswords.calledOnce).to.be.true;
      expect(stub_generateToken.calledOnce).to.be.true;
      expect(stub_findUser.calledOnce).to.be.true;
      // persisted and result user properties comparison
      expect(loggedInUser.signedToken).to.equal(persistedLoggedInUser.signedToken);
      expect(loggedInUser.user._id).to.equal(persistedLoggedInUser.user._id);
      expect(loggedInUser.user.fullname).to.equal(persistedLoggedInUser.user.fullname);
      expect(loggedInUser.user.email).to.equal(persistedLoggedInUser.user.email);
    })
  })
})
