import sinon from "sinon";
import request from "request";
import chai from "chai";

import users from "../dummies/users";

chai.should();
const BASEURL = 'http://localhost:5000';

describe('Users API', () => {
  let getStub = null;
  let postStub = null;

  beforeEach(() => {
    getStub = sinon.stub(request, 'get');
    postStub = sinon.stub(request, 'post');
  });
  afterEach(() => {
    request.get.restore();
    request.post.restore();
  });

  describe('GET /api/v1/users', () => {
    it('should return all users', (done) => {
      getStub.yields(
        null,
        users.all.success.res,
        JSON.stringify(users.all.success.body)
      );
      request.get(`${BASEURL}/api/v1/users`, 
      (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data.length.should.equal(2);
        body.data[0].fullname.should.equal('User One');
        body.data[0].email.should.equal('userOne@gmail.com');
        done();
      });
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should return a single user', (done) => {
      getStub.yields(
        null,
        users.single.success.res,
        JSON.stringify(users.single.success.body)
      );
      request.get(
        `${BASEURL}/api/v1/posts/5fb1ad6afb45c431a842c394`, 
        (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.equal('success');
        body.data.length.should.equal(1);
        body.data[0].fullname.should.equal('Single User');
        body.data[0].email.should.equal('singleUser@gmail.com');
        done();
      });
    });

    it('should throw an error if the user does not exist', (done) => {
      getStub.yields(
        null,
        users.single.failure.res,
        JSON.stringify(users.single.failure.body)
      );
      request.get(
        `${BASEURL}/api/v1/users/5fb1ad6afb45c431a842c394`,
        (err, res, body) => {
          res.statusCode.should.equal(404);
          res.headers['content-type'].should.contain('application/json');
          body = JSON.parse(body);
          body.status.should.equal('error');
          body.message.should.equal('That user does not exist.');
          done();
        }
      );
    });
  });

  describe('POST /api/v1/users', () => {
    it('should add a new user', (done) => {
      postStub.yields(
        null,
        users.add.success.res,
        JSON.stringify(users.add.success.body)
      );

      request.post(`${BASEURL}/api/v1/users`, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.equal('success');
        body.data.length.should.equal(1);
        body.data[0].role.should.equal('USER');
        body.data[0].fullname.should.equal('Added User');
        body.data[0].email.should.equal('addedUser@gmail.com');
        done();
      });
    })
  });

  describe('POST /api/v1/login', () => {
    it('should login a user', (done) => {
      postStub.yields(
        null,
        users.login.success.res,
        JSON.stringify(users.login.success.body)
      );

      request.post(`${BASEURL}/api/v1/login`, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.equal('success');
        body.data[0].result.fullname.should.equal('Logged User');
        body.data[0].result.email.should.equal('loggedUser@gmail.com');
        body.data[0].should.have.a.property('token');
        done();
      })
    });
  });
});