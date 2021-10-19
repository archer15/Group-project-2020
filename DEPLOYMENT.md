# Deployment

## Hosting
The project has been hosted via Heroku and can be found at [https://comp3120-group-e.herokuapp.com](https://comp3120-group-e.herokuapp.com)

Both the NodeJS Backend and Vue Frontend are hosted in the same [Github repository](https://github.com/MQCOMP3120-2020/group-project-group-e) and are deployed together on Heroku. Heroku runs the server via the [Procfile](https://github.com/MQCOMP3120-2020/group-project-group-e/blob/master/Procfile) and builds the Vue app via the [package.json](https://github.com/MQCOMP3120-2020/group-project-group-e/blob/master/package.json) script `heroku-postbuild`.

The PostgreSQL Database is also hosted on Heroku and connected to the app via the [Heroku Postgres](https://www.heroku.com/postgres) integration. [Sequelize](https://sequelize.org/) is then used to authenticate the server with the database using the connection string stored in the environment variables.


## Continuous Integration
We have used [Heroku Pipelines](https://devcenter.heroku.com/articles/pipelines) to enable CI with our app, and it is setup to build and deploy on changes to the `master` branch.


## Running the project locally
Follow these steps:
* [Download the installer](https://nodejs.org/) for Node LTS
* Clone this repository: `git clone https://github.com/MQCOMP3120-2020/group-project-group-e.git`
* Run `npm install` from the project root to install server npm modules
* Run `cd client && npm install` to install client npm modules
* If experiencing issues running either of these please remove the `node_modules` folder and `package-lock.json`. Then run `npm cache clean --force` and `npm install`
* To run both server and client `npm run dev`
* To run the client `npm run client`
* To run the server `npm run server`

## Building the client locally
Follow these steps:
* Run `npm run build` from the `client` directory.
* Install [Serve](https://www.npmjs.com/package/serve) globally to serve the `dist` directory via `npm i -g serve`
* Run `serve -s dist` to serve the app in Single-Page Application mode
* For more info visit https://cli.vuejs.org/guide/deployment.html#general-guidelines