# BLOGGEE API

## INTRODUCTION
---
This report details the design and implementation decisions that were taken during the development of this backend system for blogging application. The application is simple and has very basic functionalities like 
- User Sign Up and Sign In
- Creating, editing, reading and deleting blog posts
- Adding comments on the blog posts

## ARCHITECTURE
---
The API follows a monolithic architecture which best suits the projects scope due to it's simplicity. The API is RESTful to ensure ease of integration with other systems. I adhered to REST guidelines.
- Resource-Based URLs: The API follows resource-based URLs (e.g., /posts, /comments) to represent entities and actions clearly.
- HTTP Methods: Standard HTTP methods (GET, POST, PUT, DELETE) are used to perform CRUD (Create, Read, Update, Delete) operations on resources.
- Statelessness: Each request from the client to the server contains all necessary information, promoting stateless communication. This design choice enhances scalability, as servers can handle requests independently without relying on session state

### Links

- API URL: [link to the api](https://bloggee.onrender.com/docs/)
- Docs: [documentation](https://bloggee.onrender.com/docs/)

## TECHNOLOGIES AND TOOLS
---
- Backend Framework - Nodejs and Express for building the server side logic and handling HTTP requests
- Language - Typescript
- Database - MongoDb was used to store data and mongoose was the ODM of choice to simplify schema definition, data validation and database operations
- Authentication - JWT was 
- API Documentation - Swagger
- Data Validation and Sanitization - joi

## DATA MODELS
---
### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  number |  required |
|  email |  string |  required, unique |
|  name | string  |  required |
|  avatar  |  string |  required  |
|  password     | string  |  required |
|  createdAt  | date  |   |
|  updatedAt  | date  |   |


### BlogPost
| field  |  data_type | constraints  |
|---|---|---|
|  title |  string |  required |
|  content | string  |  required|
|  state |   string |  required, default: 'DRAFT', enum: ['DRAFT', 'PUBLISHED']  |
|  author |  string | required  |
|  readingTime |  number |   |
|  comments |  array |   |
|  createdAt |  date |   |
|  updatedAt    | date  |   |


### Comment
| field  |  data_type | constraints  |
|---|---|---|
|  comment |  string |  required |
|  author | number  |  required |
|  blogPost  |  number |  max:4  |
|  createdAt |  date |   |
|  updatedAt    | date  |   |

## API Endpoints

- Docs: [documentation](https://bloggee.onrender.com/docs/)

## Setting up the enviroment locally
---
You should have node on your system
1. Clone the repository:
  - `https://github.com/KorkuTegbe/blogAPI.git`
2. Install all necessary dependencies:
  - `npm install`
3. Create a .env file in the root directory using the sample.env file as a guide 

4. Build the application:
  - `npm run build`

5. Start the application
  - `npm start`
  
