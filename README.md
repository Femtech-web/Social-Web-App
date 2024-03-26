# Social App Project

![Homepage](homepage.gif)

Welcome to the Social App project! This application is designed to connect Christians from different parts of the world, providing a platform for interaction, sharing, and community building. Users can sign up, sign in, and log out, as well as perform various social activities such as posting, liking posts, commenting, creating posts, and updating posts.

## Features

- **User Authentication**: Users can sign up for an account, log in, and log out securely.
- **Social Interactions**: Users can create posts, like posts, comment on posts, and update their own posts.
- **Responsive UI**: The frontend is built using React and styled with Tailwind CSS, ensuring a seamless user experience across devices.
- **Unit Testing**: Both the frontend and backend are thoroughly tested using Jest for the frontend and Mocha for the backend.
- **Dockerized Environment**: The application is containerized using Docker, allowing for easy deployment and scalability.
- **Redis Caching**: Redis is used for caching to improve performance and optimize data retrieval.
- **CI/CD Integration**: GitHub Actions is used for Continuous Integration and Continuous Deployment (CI/CD), ensuring code quality and automated deployment.
- **Git Hooks**: Husky is utilized for pre-push and pre-commit hooks to enforce code quality standards and prevent committing of invalid code.

## Technologies Used

- **Frontend**:

  - React
  - Tailwind CSS
  - Jest (for unit testing)

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB (for data storage)
  - Redis (for caching)
  - Mocha (for unit testing)

- **DevOps**:
  - Docker
  - GitHub Actions
  - Husky

## Getting Started

To get started with the Social App project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Femtech-web/social-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd social-app
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ..
   cd server
   npm install
   ```

4. Start the application using Docker Compose:

   ```bash
   # Navigate to the root folder
   cd ..

   # Start the application
   docker-compose up
   ```

5. Access the application in your browser:

   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## Testing

To run tests for the Social App project, use the following commands:

- Frontend:

  ```bash
  cd client
  npm test
  ```

- Backend:

  ```bash
  cd server
  npm test
  ```

## Contributing

Contributions to the Social App project are welcome! If you find any bugs, issues, or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.

---

Thank you for your interest in the Social App project! If you have any questions or need further assistance, please don't hesitate to contact us. Happy networking!
