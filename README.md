# Group E Project Start Page Application

## Group Breakdown
* Database Lead | Joshua Archer | 45235074
* Front-End Lead | John Hemans | 45234639
* Back-End Lead | Priyanshi Patel  | 45472165



## Application Description
The application can be accessed here [https://comp3120-group-e.herokuapp.com/](https://comp3120-group-e.herokuapp.com/)
All parts of the application is hosted by Heroku. A detailed guide on accessing and deploying the application can be found [HERE](https://github.com/MQCOMP3120-2020/group-project-group-e/blob/master/DEPLOYMENT.md)

## Core Components
The application comprises of a variety of different features which can be displayed in 2 different forms. If there is a user logged in or not.

### Not-Logged in user
The non-user has access to limited functionality in the application. They can see a selected background which rotates to different hand picked backgrounds for the webpage on a 5 minute timer. This background can be seen implemented in the following file [/client/src/views/Home.vue](https://github.com/MQCOMP3120-2020/group-project-group-e/blob/master/client/src/views/Home.vue).

The general user also has access to the favorites bar which has a basic design rendering clickable images to the application. The non logged in user has a default favorites bar. This can be accessed in the following path [client/src/components/menu/FavoriteBar.vue](https://github.com/MQCOMP3120-2020/group-project-group-e/blob/master/client/src/components/menu/FavoriteBar.vue)

The weather component uses the users current general location to display a weather display. The application uses a weather API from the following [Vue-Weather-Widget](https://www.npmjs.com/package/vue-weather-widget). It takes an API key and a unit type. The weather widget has a nice display which shows visually if the weather is hot, cold, raining or cloudy.

Since the user is not logged in, they do not have access to customize any features for the application. To get access to the whole application, the user can either log in, if they have created an account and input their username and password. If the user has never logged in before, they can register an account. By inputing a login username, password, an email, firstname and last name. Once the user registers they are automatically logged in.

# News
The news data is fetched using the Bing Search API provided by Rapid API via the `news.api.js` file. Initially, the NewsCategory endpoint retrieves Global news and displays them on the client. This data is displayed in a grid of 'Cards' utilising the URL, img and title the API returns. This grid is provided by [vue-stack-grid](https://www.npmjs.com/package/vue-stack-grid) which allows for a fluid, dynamic grid.

The user can use the search bar to hit the Search endpoint which will return news results based on the user's query. This query can be removed to once again get Global news displayed to the user.

Results returned by the API are paginated and the Intersection API is used to mimic 'endless scrolling'. Once the user reaches the bottom of the results, the Intersection API will fire an event and trigger an API call for the next 'page' of results. Once the results returned are less than that of the page size, a message is displayed to the user notifying they've reached the end.

All api calls are 'cached' in LocalStorage via VueX. This is implemented via a cache key based on the query string used in the api call and the api endpoint. The timestamp of the call is recorded and the cache is 'busted' after 15 minutes. This was implemented to reduce API calls for efficiency and to account for the FREE tier limits of the API.

### Logged in user
The user details are stored locally in a view using the VueX library. This library enables the user to keep their login information when refreshing or re opening the application. The view only expires when the user logs out manually.

Now that the user has been logged in, they have more options of customizability. The user can upload a profile picture, change their credentials. The user credentials can be changed [here](https://github.com/MQCOMP3120-2020/group-project-group-e/tree/master/client/src/components/account/profile).

The profile picture is uploaded via a HTML File upload input, which passes the img BLOB to the server endpoint. The server intercepts and validates the file data via [multer](https://github.com/expressjs/multer). Once validated, the file is given a unique filename and uploaded to an AWS S3 bucket. The [multer-s3](https://www.npmjs.com/package/multer-s3) and [aws-sdk](https://www.npmjs.com/package/aws-sdk) packages take care of this. The AWS credentials utlized in this operation are stored in the environment variables. The image S3 bucket URL is saved with the User model in the DB and the updated User is returned to the client where the Profile Image is displayed.

Futhermore, the user has access to a todo list and a calendar. Currently they are seperate features but with future development time they would be implemented together.

# Priya The todo list

The calendar displays 3 views of a typical calendar. A daily view, weekly view and monthly view. The logged in user can add to the calendar by selecting from a list of different general types of events, for example, "meeting", "Holiday" or "birthday". The user then can select a time and date and this event will be then added to the calendar. For the Todo list the users can only access that when they are logged  into the system. This feature helps the users to add the list of their pending tasks, also whent the tasks are doen it helps the users to clear the done tasks. Also the users can custoise it, like they can only their remaining tasks and also they can clear all the tasks. So this way the users can upadte there todo list in the way they want.

##
