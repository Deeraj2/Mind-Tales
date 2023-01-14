# Mind-Tales


MindTales is a blog app where expert and undiscover voices write their thoughts, ideas, story etc.User can publish or unpubish the blog and like, comment, save, delete and view the other user profile.Implemented the entire login system to allow CRUD operation on the user blog.

## Installation

Clone the project :

```javascript
//directory of the repository
cd Mind-Tales/

//install the packages
npm install
```

```javascript
//directory of the frontend folder
cd client/

//directory of the backend folder
cd server/

```


## Design

### Database:
2 tables:
  * Users: Stores everything about the user.
  * Blog: Stores all the detail about the blog i.e. like, comment, save, publish, UserId

### Server-Side:
Rest API:
  * Express with 2 Routes.
    * User: User route that checks if the user already has an account in the platform. If not, it inserts a new row in the User tables and fetches all the relevant info.When a user's name is searched in the search bar, the data of that user will be fetched from table.
    * Blog: Blog route handles all CRUD, like, save and comment opeartion related to the blog.

### Front-End:
  * Front-end is fully developed in ReactJS using npx create-react-app boilerplate.
  
## Made Using:
* **[ReactJS](https://reactjs.org/docs/getting-started.html)**
* **[NodeJS](https://nodejs.org/en/docs/)**
* **[ExpressJS](https://expressjs.com/)**
* **[MongoDB](https://www.mongodb.com/)**

## Tools:
  * Visual Studio Code
  * Insomnia
  * Robo 3T 1.4.3
