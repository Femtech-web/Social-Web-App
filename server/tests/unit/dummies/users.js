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
            fullname: 'User One',
            email: 'userOne@gmail.com',
            password: 'shhsh366373gsfriryyrk4644',
            role: 'USER',
            createdAt: '2024-03-15T22:36:26.566Z'
          },
          {
            _id: '5fb1ac21fb45c431a842c393',
            fullname: 'User Two',
            email: 'userTwo@gmail.com',
            password: 'jfghd88474llhdhd057dg',
            role: 'USER',
            createdAt: '2024-03-15T22:52:26.194Z',
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
            fullname: 'Single User',
            email: 'singleUser@gmail.com',
            password: 'dkdjh8855kkhd9840ddkd',
            role: 'USER',
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
        message: 'That user does not exist.'
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
            fullname: 'Added User',
            email: 'addedUser@gmail.com',
            password: '8dhdh058djd0443djcv',
            role: 'USER',
            createdAt: '2024-03-15T22:36:26.566Z',
          }
        ]
      }
    }
  },
  login: {
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
            result: {
              _id: '5fb1ad6afb45c431a842c000',
              fullname: 'Logged User',
              email: 'loggedUser@gmail.com',
              password: '85jcksgyeei00044lvnkk6x900',
              role: 'USER',
              createdAt: '2024-03-15T22:36:26.566Z',
            },
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmY2RiMWQ2ZWZkODU4YjMwZGRkNGEwIiwiZW1haWwiOiJib3NzZmVtenkxMEBnbWFpbC5jb20ifSwiaWF0IjoxNzExMDk4MTAzLCJleHAiOjE3MTExODQ1MDN9.-ew2lW3QF0agfzdpKI3toazqtMWIPccHWLm8Gu9iBAI'
          }
        ]
      }
    }  
  }
};
