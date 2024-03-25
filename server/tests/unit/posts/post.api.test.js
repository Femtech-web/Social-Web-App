import sinon from "sinon";
import request from "request";
import chai from "chai";

import posts from "../dummies/posts";

chai.should();
const BASEURL = 'http://localhost:5000';

describe('Posts API', () => {
  let getStub = null;
  let postStub = null;
  let patchStub = null;
  let deleteStub = null;

  beforeEach(() => {
    getStub = sinon.stub(request, 'get');
    postStub = sinon.stub(request, 'post');
    patchStub = sinon.stub(request, 'patch');
    deleteStub = sinon.stub(request, 'delete');
  });
  afterEach(() => {
    request.get.restore();
    request.post.restore();
    request.patch.restore();
    request.delete.restore();
  });

  describe('GET /api/v1/posts', () => {
    it('should return all posts', (done) => {
      getStub.yields(
        null,
        posts.all.success.res,
        JSON.stringify(posts.all.success.body)
      );
      request.get(`${BASEURL}/api/v1/posts`, 
      (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data.length.should.equal(2);
        body.data[0].title.should.equal('title1');
        body.data[0].tags[1].should.equal('faith');
        body.data[0].selectedFile[0].should.equal('www.img1.com');
        done();
      });
    });
  });

  describe('GET /api/v1/posts/:id', () => {
    it('should return a single post', (done) => {
      getStub.yields(
        null,
        posts.single.success.res,
        JSON.stringify(posts.single.success.body)
      );
      request.get(
        `${BASEURL}/api/v1/posts/5fb1ac21fb45c431a842c393`, 
        (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.equal('success');
        body.data.length.should.equal(1);
        body.data[0].tags[0].should.equal('joy');
        body.data[0].title.should.equal('single title');
        done();
      })
    });

    it('should throw an error if the post does not exist', (done) => {
      getStub.yields(
        null,
        posts.single.failure.res,
        JSON.stringify(posts.single.failure.body)
      );
      request.get(
        `${BASEURL}/api/v1/posts/5fb1ac21fb45c431a842c393`,
        (err, res, body) => {
          res.statusCode.should.equal(404);
          res.headers['content-type'].should.contain('application/json');
          body = JSON.parse(body);
          body.status.should.equal('error');
          body.message.should.equal('That post does not exist.');
          done();
        }
      );
    });
  });

  describe('POST /api/v1/posts', () => {
    it('should add a new post', (done) => {
      postStub.yields(
        null,
        posts.add.success.res,
        JSON.stringify(posts.add.success.body)
      );

      request.post(`${BASEURL}/api/v1/posts`, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.equal('success');
        body.data.length.should.equal(1);
        body.data[0].title.should.equal('title3');
        body.data[0].creator.should.equal('5fb1ac21fb45c431a842c393');
        body.data[0].tags[0].should.equal('happiness');
        body.data[0].selectedFile[0].should.equal('www.addImg.com');
        done();
      })
    })
  });

  describe('PATCH /api/v1/posts/:id', () => {
    it('should return the updated post', (done) => {
      patchStub.yields(
        null,
        posts.update.success.res,
        JSON.stringify(posts.update.success.body)
      );

      request.patch(
        `${BASEURL}/api/v1/posts/5fb1ac21fb45c651a842c286`, 
        (err, res, body) => {
          res.statusCode.should.equal(200);
          res.headers['content-type'].should.contain('application/json');
          body = JSON.parse(body);
          body.status.should.equal('success');
          body.data[0].title.should.equal('title4');
          body.data[0].creator.should.equal('5fb1ac21fb45c431a842c393');
          done();
      })
    });
  });

  describe('DELETE /api/v1/posts/:id', () => {
    it('should delete a single post', (done) => {
      deleteStub.yields(
        null,
        posts.delete.success.res,
        JSON.stringify(posts.delete.success.body)
      );

      request.delete(`${BASEURL}/api/v1/posts/5fb1ac21fb43c611a842c266`, 
      (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.equal('success');
        body.data[0]._id.should.equal('5fb1ac21fb43c611a842c266');
        done()
      })
    })
  });
});