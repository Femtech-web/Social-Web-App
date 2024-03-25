export default {
  all: {
    success: {
      res: {
        statusCode: 200,
        headers: {
          'content-type': 'application/json'
        }
      },
      body: {
        status: 'success',
        data: [
          {
            _id: '5fb1ad6afb45c431a842c394',
            name: 'name1',
            creator: '5fb1ad6afb41c431a842c865',
            title: 'title1',
            context: 'description1',
            likes: [],
            comments: [],
            tags: ['love', 'faith'],
            selectedFile: ['www.img1.com'],
            createdAt: '2024-03-15T22:36:26.566Z'
          },
          {
            _id: '5fb1b12a6ac3e23493ac82e4',
            creator: '5fb1ac21fb45c431a842c393',
            name: 'name2',
            title: 'title2',
            context: 'description667',
            likes: [],
            comments: [],
            tags: ['unity', 'peace'],
            selectedFile: ['www.img2.com'],
            createdAt: '2024-03-15T22:52:26.194Z',
            userId: '5fb1ac21fb45c431a842c393'
          }
        ]
      }
    }
  },
  single: {
    success: {
      res: {
        statusCode: 200,
        headers: {
          'content-type': 'application/json'
        }
      },
      body: {
        status: 'success',
        data: [
          {
            _id: '5fb1ad6afb45c431a842c394',
            name: 'single name',
            title: 'single title',
            creator: '5fb1ac21fb45c431a842c393',
            context: 'description1',
            likes: [],
            comments: [],
            tags: ['joy', 'love'],
            selectedFile: ['www.singleImg.com'],
            createdAt: '2024-03-15T22:52:26.194Z',
          }
        ]
      }
    },
    failure: {
      res: {
        statusCode: 404,
        headers: {
          'content-type': 'application/json'
        }
      },
      body: {
        status: 'error',
        message: 'That post does not exist.'
      }
    }
  },
  add: {
    success: {
      res: {
        statusCode: 201,
        headers: {
          'content-type': 'application/json'
        }
      },
      body: {
        status: 'success',
        data: [
          {
            _id: '5fb1ad6afb45c431a842c000',
            name: 'name3',
            creator: '5fb1ac21fb45c431a842c393',
            title: 'title3',
            context: 'description3',
            likes: [],
            comments: [],
            tags: ['happiness', 'faith'],
            selectedFile: ['www.addImg.com'],
            createdAt: '2024-03-15T22:36:26.566Z',
          }
        ]
      }
    }
  },
  update: {
    success: {
      res: {
        statusCode: 200,
        headers: {
          'content-type': 'application/json'
        }
      },
      body: {
        status: 'success',
        data: [
          {
            _id: '5fb1ac21fb45c651a842c286',
            title: 'title4',
            creator: '5fb1ac21fb45c431a842c393',
            name: 'name4',
            context: 'description3updated',
            tags: ['family', 'unity'],
            createdAt: '2024-03-15T22:36:26.566Z',
          }
        ]
      }
    }
  },

  delete: {
    success: {
      res: {
        statusCode: 200,
        headers: {
          'content-type': 'application/json'
        }
      },
      body: {
        status: 'success',
        data: [
          {
            _id: '5fb1ac21fb43c611a842c266',
            title: 'title5',
            creator: '5fb1ac11fb95c431a842c352',
            name: 'name5',
            context: 'description5',
            likes: [],
            comments: [],
            tags: ['joy', 'kindness'],
            createdAt: '2024-03-15T22:36:26.566Z',
          }
        ]
      }
    }
  }
};
