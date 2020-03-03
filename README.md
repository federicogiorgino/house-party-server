
# HOUSEPARTY

## Description

This app helps users organizing and joining House Parties. 

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start partying
-  **Login:** As a user I can login to the platform so that I can start partying
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add Party** As a user I can add a party
-  **Edit Party** As a user I can edit a party
-  **View Party** As a user I can view others party
-  **Join Party** As a user I can join a party
-  **Edit My Profile** As a user I can edit my profile
-  **Delete My Profile** As a user I can delete my profile




## Backlog

User profile:
- add geolocation to events when creating
- comments and rate other people profile/events


<br>


# Client / Frontend

## React Router Routes (React App)
| Path                      | Component            | Permissions                 | Behavior                                                      |
| ------------------------- | -------------------- | ----------------------------|---------------------------------------------------------------|
| `/`                       | SplashPage           | public `<Route>`            | Home page                                                     |
| `/signup`                 | SignupPage           | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | LoginPage            | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login  |
| `/logout`                 | n/a                  | user only `<PrivateRoute>`  | Navigate to homepage after logout, expire session             |
| `/parties`                | AllPartiesPage       | user only `<PrivateRoute>`  | Shows all party in a list                                     |
| `/parties/add`            | AllPartiesPage       | user only `<PrivateRoute>`  | Adds a party                                                  |
| `/parties/:id`            | SinglePartyPage.     | user only `<PrivateRoute>`  | Details of a party                                            |
| `/party/:id`              | n/a                  | user only `<PrivateRoute>`  | Delete party                                                  |
| `/party/guest`          | GuestsPage           | user only  `<PrivateRoute>` | List of attending guest of a party                            |
| `/profile`                | ProfilePage          | user only  `<PrivateRoute>` | Shows user profile page                                       |
| `/profile/:id`            | ProfileEditPage      | user only  `<PrivateRoute>` | Edits user profile info                                       |




## Components

- SplashPage

- LoginPage

- AllPartiesPage

- SinglePartyPage

- GuestPage

- ProfilePage

- ProfileEditPage

- Navbar


  

 

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Tournament Service
  - tournament.list()
  - tournament.detail(id)
  - tournament.add(id)
  - tournament.delete(id)
  
- Player Service 

  - player.detail(id)
  - player.add(id)
  - player.delete(id)

- Game Service

  - Game.put(id)



<br>


# Server / Backend


## Models



User model

```javascript
{
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  attending: [],
  organizing: [],
  profilePicture: { type: String, required: true },
  bio: { type: String, required: true }
}
```



Game model

```javascript
{
  title: { type: String, required: true },
  description: { type: String, required: true },
  guestLimit: { type: Number, required: true },
  guestCount: Number,
  guestsID: [],
  hostID: String,
  location: { type: String, required: true },
  date: { type: String, required: true },
  hour: { type: String, required: true },
  photo: String
}
```


<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `           | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | `/parties`                      |                              |                | 400          | Show all parties                                         |
| GET         | `/party/:id`                  | {id}                         |                |              | Show specific party                                     |
| POST        | `/parties/add-tournament`     | {}                           | 201            | 400          | Create and save a new tournament                             |
| PUT         | `/parties/edit/:id`           | {name,img,players}           | 200            | 400          | edit party                                              |
| DELETE      | `/parties/delete/:id`         | {id}                         | 201            | 400          | delete party                                            |
| GET         | `/profile`                    |                              |                | 400          | show profile                                                 |
| GET         | `/profile/:id`                | {id}                         |                |              | show specific profile                                         |


<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/invite/b/zH5UNjzn/acec2e53155b4adcfaa259b59edc0da8/house-party) 
or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
```
