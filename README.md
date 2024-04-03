# LOTRWiki

## Introduction

This web app was created as a project assignment for SoftUni's Angular Course. It is a web application that provides information about the Lord of the Rings (LotR) trilogy and The Hobbit.

## Structure

The information is divided into three sections, accessible through a dropdown menu (LOTRWiki):
- /books: provides information about the LotR and The Hobbit books.
- /films: provides information about the LotR and The Hobbit films.
- /characters: provides information about the LotR and The Hobbit characters. Here, users can add, delete, and edit information.

Other pages included in the project are:
- /home: the landing page where you can read some interesting facts about the project's theme.
- /map: provides information about the project and its features.
- /contacts: provides links for contacting the creator.
- /signup: allows unauthorized users to create an account.
- /login: allows users who have created an account to log in.
- /account: provides information about the account and characters created by the currently logged-in user via /dashboard.

## Technologies

- Angular v16.2.12 for the frontend.
- TypeScript.
- Firebase for the backend:
  - Firebase Authentication
  - Realtime Database (for facts, books, and films)
  - Firestore (for characters)
  - Firebase Hosting
- Bootstrap v5.3 for styling
- RxJS for reactive programming
- Angular Animations

## Features

- Audio Player: sets the mood.
- Searchbar: provides access to /books, /characters, and /films.

## Launch

To run the project:

1. Clone the LOTRWiki repository: [LOTRWiki Repository](https://github.com/StefanDimitrow/LOTRWiki).
2. Run `npm install` to install all dependencies.
3. Run `ng serve` to build the project.
4. Navigate to localhost:4200 in your browser to see the project.
