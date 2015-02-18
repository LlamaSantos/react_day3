# NBA Routes
============

##Objectives
The purpose of this project is get you comfortable with routing using React Router as well as creating real time applications with Firebase as your data store. A very common use case in web development is securing certain routes so only authenticated users may see those routes. We'll do just that in this application. Every user will be able to see the certain teams schedule, but only authenticated users will be able to create a name game in that teams schedule. Get used to what the application is doing, the example app can be found [HERE](http://reactweek.com/projects/nba-routes).

Some side notes before we get started. 
* This project will contain a lot of bootstrap boilerplate. Feel free to remove this and create your own if you'd like. 
* Notice the original file structure is just like every other project we've done thus far with a few additions. One of those additions is that our public folder has an images folder which has a "spritesheet.png" file in it. This, as you've probably guessed, is just a sprite sheet of all the images we'll be using in this app. If you're new to "Sprites", quickly read [THIS](http://css-tricks.com/css-sprites/) article to get caught up to speed. It should take you no more than 5 minutes.
* You'll need to create your own Firebase account and new project. To do that head over to [Firebase.com](firebase.com) and sign up for an account. Once you sign up and login, you'll be taken to your dashboard where you can create a new app. For now, just create a new app in firebase. 
* This project is intentionally rather large. If you don't get done, don't sweat it. The biggest thing to remember is that you're here to learn, which is usually a by product of finishing the repo. If you don't get done but you feel comfortable with authenticated routes, routing, and some basic firebase functions, you're in a good spot.

###Step 1: Code Architecture
Let's get familiar with the code we're given.

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

#### Step 2: Protected Routes

The very first thing we're going to do is create a boilerplate for protecting certain routes in our application. Once this boilerplate is set up, authenticating specific routes will be a breeze. *I'm going to follow [THIS](https://github.com/rackt/react-router/blob/master/examples/auth-flow/app.js) example from the React Router docs pretty closely for this first part. Feel free to take a glimpse over there if you get stuck.* 

Head over to your ```authenticated.js``` file in the ```utils``` folder. As mentioned earlier, this module we'll add in as a mixin on any component which we want the user to be authenticated to see. What will then happen is whenever a user goes to this specific component's route, the ```willTransitionTo``` hook we're about to write will catch that request, and run its callback which will check if they're logged in and if they're not, it will redirect them to the ```login``` route.

* In the ```authenticated.js``` file, require the ```Login``` component as well as the ```firebaseUtils``` file. 
* Create an ```authenticated``` object and then use ```module.exports``` to export that object so we can require it in other files.
* Add a ```statics``` property to the ```authenticated``` object. 
* Inside your ```statics``` object, add a ```willTransitionTo``` method which has ```transition``` as its paramter.

Now what we're going to do is invoke the ```isLoggedIn``` method on our firebaseUtils object which will check is the user is logged if. If they're not, we'll redirec them to the login route.

* If ```firebaseUtils.isLoggedIn()``` is falsy, then add a property to the ```Login``` component called ```attemptedTransition``` and set it equal to the transition parameter. Then, use ```transition.redirect('login')``` to redirect to the login page. 

The main point of that if statement was to check if the user was logged in and if not, redirect them to login. This wasn't the only purpose though. What's fantastic about React Router is it can cache the authenticated route you're wanting to go to, log you in, then continue to that route once you've logged in. That's the purpose of the ```Login.attemptedTransition = transition``` line. You cache the transition as a property on the Login component then in our Login component once we login, we'll redirect to that original route. 

your ```willTransitionTo``` method should look like this, 
```javascript
willTransitionTo: function(transition){
  if(!firebaseUtils.isLoggedIn()){
    Login.attemptedTransition = transition;
    transition.redirect('login');
  }
}
```

Now head over to the ```Login.js``` file. 

Notice you have a few things included already. All your requires, a ```Router.Navigation``` mixin, an ```attemptedTransition``` statics method, and some JSX templates. The only thing we're missing is the handleSubmit method. Take a second to familiarize yourself with the given code, then dive into creating the ```handleSubmit``` method.

* Create a method called ```handleSubmit``` which takes ```e``` as a parameter.
* use ```e.preventDefault()``` to prevent the default action of clicking this button.
* create an ```email``` and a ```pw``` variable which are both values from the input boxes. *hint. Use ```this.refs.REFNAME.getDOMNode().value```.

So now we have the email and password, we're going to want to log the user in with firebase.

* invoke the ```loginWithPW``` method on the firebaseUtils object passing it two arguments. The first argument is an object with the keys ```email``` and ```password``` whose values are the email and pw variables we made early, and the second argument is a callback function which will get invoked when firebase has logged the user in. 

Now is where the magic happens. Remember in the ```authenticated.js``` file when we added a ```attemptedTransition``` propery on our Login component if a user tried to visit a route they weren't authenticated for? Well remember that took them to the login route and cached the attempted route as ```attemptedTransition```. So what we're going to want to do in this callback is check if ```attemptedTransition``` is a thing, because if it is, that means we got to this route by attempting to visit another route we weren't authenticated for and once we do login, we should continue to that route again.

* In the callback function (2nd parameter to the loginWithPW method), create an if statement that checks if ```Login.attemptedTransition``` is truthy. If it is, save the current value of ```Login.attemptedTransition``` to a variable called ```transition```, then set ```Login.attemptedTransition``` to null, then invoke the ```retry``` method on your current ```transition``` variable. ```retry()``` will continue to the route the user was originally trying to get to when they were taken to login. If ```Login.attemptedTransition``` was not truthy, then in your else statement use ```this.replaceWith('home')``` to take the user to the ```home``` state. 

To reiterate one more time on what's happening above. If a user tries to go to a route they're not authenticated for, our app will now take them to this Login component and cache the original route they were attempting to go to. When they login, if there was an original route they were trying to go to, once they log in they'll be taken to that route. If there wasn't an original route and they just went straight to the Login route, our app will just take them to the home route.




