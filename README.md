# NBA Routes
============

##Objectives
The purpose of this project is get you comfortable with routing using React Router as well as creating real time applications with Firebase as your data store. A very common use case in web development is securing certain routes so only authenticated users may see those routes. We'll do just that in this application. Every user will be able to see the certain teams schedule, but only authenticated users will be able to create a name game in that teams schedule. Get used to what the application is doing, the example app can be found [HERE](http://reactweek.com/projects/nba-routes).

Some side notes before we get started. 
* This project will contain a lot of bootstrap boilerplate. Feel free to remove this and create your own if you'd like. 
* Notice the original file structure is just like every other project we've done thus far with a few additions. One of those additions is that our public folder has an images folder which has a "spritesheet.png" file in it. This, as you've probably guessed, is just a sprite sheet of all the images we'll be using in this app. If you're new to "Sprites", quickly read [THIS](http://css-tricks.com/css-sprites/) article to get caught up to speed. It should take you no more than 5 minutes.
* You'll need to create your own Firebase account and new project. To do that head over to [Firebase.com](firebase.com) and sign up for an account. Once you sign up and login, you'll be taken to your dashboard where you can create a new app. For now, just create a new app in firebase. 
* This project is intentionally rather large. If you don't get done, don't sweat it. The biggest thing to remember is that you're here to learn, which is usually a by product of finishing the repo. If you don't get done but you feel comfortable with authenticated routes, routing, and some basic firebase functions, you're in a good spot.

###Step 1: Authentication Boilerplate
The very first thing we're going to do is create a boilerplate for protecting certain routes in our application. Once this boilerplate is set up, authenticating specific routes will be a breeze. *I'm going to follow [THIS](https://github.com/rackt/react-router/blob/master/examples/auth-flow/app.js) example from the React Router docs pretty closely for this first part. Feel free to take a glimpse over there if you get stuck.* 

The default folder structure should look like this
```
├── app/
│   ├── App.js
|   ├── components/
|   ├── ├── login-register/
|   ├── ├── ├── Login.js
|   ├── ├── ├── Logout.js
|   ├── ├── ├── Register.js
|   ├── ├── secure/
|   ├── ├── ├── AddGame.js
|   ├── ├── Main.js
|   ├── ├── Home.js
|   ├── config/
|   ├── ├── routes.js
|   ├── utils/
|   ├── ├── authenticated.js
|   ├── ├── sprite.js
|   ├── ├── nbaTeams.js
|   ├── ├── firebaseUtils.js
├── public/
│   ├── index.html
|   ├── images/
│   ├── ├── spritesheet.png
├── webpack.config.js
├── package.json
├── README.md
├── .gitignore
```

That's a pretty big list. Don't panic. Remember one of the benefits of using React is that we're able to keep things very compartmentalized as we see in our folder structure above. Although you probably already have a good idea of what's going to happen with the folder structure, let's take a little deeper dive and look at each piece and its purpose.

First, notice our components folder is split into three sections. ```login-register```, ```secure```, and any other components. As you can imagine, all of our components that deal with login/logout and registration will go in the login-register folder, our components which we want only authenticated users to view (because components will be tied to routes) will go in the secure folder, and any other component will just go in the components folder. 

Our ```routes.js``` file in our ```config``` folder is going to be the definition of our routes with React Router. 

Now let's take a look at the ```utils``` folder. 
  - ```authenticated.js``` will be a mixin we put on any components we want to be a "protected" component (or route). React Router gives us a hook into its life cycle and this authenticated component will run before a component is mounted, it will check if the user is authenticated, if he/she is not, it will redirect them to the login route.
  - ```firebaseUtils.js``` will be a bunch of helper methods for communicating with firebase.
  - ```nbaTeams.js``` is just an array and an object full of all the teams who will have their own schedule in our app.
  - ```sprite.js``` will just return an object which we will use for our CSS for the ```spritesheet.png``` file later. 

That's pretty much it. I know that seems like a lot, because it is. This is a pretty big app that has some pretty fundamental pieces to it. 



