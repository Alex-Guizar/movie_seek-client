# Movie Seek

Application where users can come to look for and keep track of their favorite movies. Retrieves movie and user information through the movie-seek API.

View the [live demo](https://movie-seek.netlify.app/) to check the application out in action.

The main index file is located at `src/index.html`.

## Built With

* React
* React Router
* Redux
* Bootstrap
* Axios

## Getting started

### Install

After cloning the repository, you may run either `yarn` or `npm install` to install the dependencies.

## Application Views

### Main View

Displays full list of movies when logged in. Component used for navigation to other views.

![Main view showing movie covers and descriptions](readmeImages/main-view.jpg)

### Login View

Allows the user to log in with a username and password. Main entry point for users. Connects to the registration view for any user that needs to create an account.

![Login view with input fields](readmeImages/login-view.jpg)

### Registration View

Allows the user to create a profile by entering a username, email, password, and optionally a birthday.

![Registration view with input fields](readmeImages/registration-view.jpg)

### Profile View

Allows user to edit their personal information. Allows user to remove movies from their favorites list.

![Profile view with input fields and favorite movies list](readmeImages/profile-view.jpg)

### Movie View

Displays the title and description about the selected movie. Connects to the director and genre views.

![Movie view showing movie cover and description](readmeImages/movie-view.jpg)

### Director View

Displays the name, bio, birth date, and death date about the selected director.

![Director view showing director information](readmeImages/director-view.jpg)

### Genre View

Displays the name and description about the selected genre.

![Genre view showing information about the seleted genre](readmeImages/genre-view.jpg)

## Dependencies

* axios ^0.21.4
* parcel ^2.0.0-rc.0
* prop-types ^15.7.2
* react ^17.0.2
* react-bootstrap ^1.6.3
* react-dom ^17.0.2
* react-redux ^7.2.5
* react-router-dom ^5.3.0
* redux ^4.1.1
* redux-devtools-extension ^2.13.9

## Dev Dependencies

* @babel/core ^7.15.5
* @babel/generator ^7.15.4
* @babel/parser ^7.15.6
* @babel/preset-env ^7.15.6
* @babel/traverse ^7.15.4
* @parcel/transformer-sass ^2.0.0-rc.0