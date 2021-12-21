For our deployment, we have a lot of possible options for our server configurations. We have been running two servers up until this point. The webpack development server, and the scheduler API server each have a specific purpose.

The development server is excellent for development, but it is not a production web server. One option is to combine the two servers into one. If we combined these servers, then we would need to handle both of the responsibilities.

Serve the static JavaScript, HTML and CSS assets that make up the client application.
Handle the /api/* routes that the client calls to retrieve data.
We are going to take a different approach because some applications may not need to deploy an API. We could use existing APIs that run on third-party servers. We will be able to explore more of our deployment options by keeping these servers separate.

The Interview Scheduler doesn't have an existing public API, so we will deploy the scheduler-api using a service called Heroku.

Heroku Dashboard
Heroku is a service that simplifies the deployment process for web applications. It supports many different languages and platforms.

Visit the Heroku site and sign in or sign up to reach the dashboard.

![](2021-12-15-16-09-34.png)

Heroku Welcome

New Application
We want to create a new application in the "United States" region. The application name will need to be unique, but Heroku informs us if it is not. When we connect to the server, we will use the app name in our URL.

When Heroku provides the domain information for us, they give us a subdomain matching our app name. Something like https://scheduler-lhl.herokuapp.com/.

Click on the "New" button at the top right to reveal the "Create new app" option. Create a new application with a name that is available. The form will not allow us to advance without a unique name.

When we finish creating the app, the dashboard redirects us to our deployment instructions.

Postgres Add-on
Before deploying the application, we need to configure a database. It will be our production database, and Heroku provides it as an add-on service.

Click on the "Resources" tab to add a new "Heroku Postgres" add-on using the search bar. Choose the "Hobby Dev - Free" plan name.

![](2021-12-15-16-09-55.png)

Heroku Postgres

Configuring our server to use the new production database is already done for us. When we create a new database using Heroku, it will also add an environment variable that our application can use to find the right database server.

The scheduler_development and scheduler_test databases that we have created so far have been in our local version of PostgreSQL. The production database lives on Amazon servers somewhere in the cloud.

Production Seeding
Our database has no schema and no default data. We have files in our src/db/schema/ folder that we can import once we make a connection to the production database.

Navigate to the "Settings" tab of the Heroku dashboard. Click the "Reveal Config Vars" button.

![](2021-12-15-16-10-06.png)

Database Configuration

The DATABASE_URL environment variable is enough to provide all of the required information to make a database connection. We can declare it as something called a connection string. Clicking on the edit button for the DATABASE_URL variable opens up a window that allows us to edit the value. Do not change this value.

Heroku is providing this configuration string to us, but we could also use this pattern for our own configuration file. Currently we declare five variables in the .env.* file of our scheduler-api server. Instead we could write something like DATABASE_URL=postgresql://development:development@localhost:5432/scheduler_development; in our .env.development file. Pay close attention to the structure of this string. It uses :, @ and / all as separators.

![](2021-12-15-16-10-21.png)

Edit

Every application on Heroku that uses the Postgres add-on will have a different value for this variable. It is the best way for us to gain access to the information so that we can connect to the server and seed the database.

Now that we know how to connect to the database, we can use psql to import our seed files. We connect by providing some details about the server we want to use on the command line. We need to connect to our PostgreSQL database using psql in the vagrant Guest machine.

provide the host eg. localhost or ec2.compute-1.amazonaws.com with -h
provide the port eg. 5432 with -p
provide the username eg. tetsposyklypxl with -U
provide the database eg. d5paf7gvagjk5u with -d
If we were to take the above values, what command would we create to connect to the production database with psql?

psql -h localhost -p 5432 -U tetsposyklypxl -d d5paf7gvagjk5u
From the root of the scheduler-api project in a Guest terminal, connect to the database with the values provided by heroku usingpsql -h <host> -p <port> -U <username> -d <database>. The server will ask for the password. Use the one from the DATABASE_URL.

Writing the above command in an empty text file can make it easier to construct with copy and paste. Once the long command is built, copy and paste the entire string into the terminal to run it.

![](2021-12-15-16-10-52.png)

Connected

These databases, users names and passwords are generated. Be careful when copying and pasting not to miss a single character. Copying and pasting the password should work, but if it is not please ask for help.

The prompt matches the name of the database that our application is using. We can run queries or import .sql files to create the initial state of our production database.

Create the tables using the create.sql file. Run the command \i src/db/schema/create.sql.

We can verify that the tables exist with the command \dt.

List of Relations

The appointment data must be seeded before we run the server for the first time. With the tables created, we can import the src/db/schema/production.sql in the same way.

Import the production.sql file to seed the tables with data.

We can query the data to see if it is seeded correctly. There won't be any appointments booked since this is the production database.

Seeded

Any query that gives confidence that the database is seeded will work, but something like SELECT * FROM days JOIN appointments ON appointments.day_id = days.id; will give us a view of all the appointments for each day.

The database is ready for connections and queries. Quit from psql with \q.

Deployment
We will use the heroku command-line interface to interact with the Heroku tools. Install this as a global module using npm install -g heroku on the Host machine.

Install heroku using npm install -g heroku.

The first thing we need to do is authenticate with Heroku. We can do this with the heroku login command.

Run the heroku login command and look at the output. Press enter to open the browser with the login interface.

Heroku let's us login through the web interface, but the command line client receives permission to connect.

Login

![](2021-12-15-16-11-18.png)

We already have a repository that we can connect to our Heroku application. We use the app name to identify the application that we would like to connect.

From the root folder of the scheduler-api project run the heroku git:remote -a <app name> command. The app name will match the one used to create the application.

We can verify our remote repository with the git remote -v command.

![](2021-12-15-16-11-29.png)

Remote Repository

We can push to a remote repository like that one we created with Heroku. When we push the application code, Heroku will build and environment and run our server. Git is an excellent tool for deploying our application.

Use the git push heroku master command to send the code to Heroku and start a build.

If the build is successful, then we can make API requests to the server from our browser. The URL is output by the Heroku script.

remote: -----> Build succeeded!
remote: -----> Discovering process types
remote:        Procfile declares types     -> (none)
remote:        Default types for buildpack -> web
remote:
remote: -----> Compressing...
remote:        Done: 20.7M
remote: -----> Launching...
remote:        Released v5
remote:        https://scheduler-lhl.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
Server JSON

If the deployment doesn't work, then the best place to start is the server logs. From the terminal window type heroku logs --tail to access the console output. It is always good to run the server in a local environment to confirm that it still works.

Keep in mind that we only support three GET endpoints on the server. The / path will return a 404 error.

/api/days/
/api/appointments/
/api/interviewers/
Summary
Heroku takes care of the server configuration process. We could replicate the environment ourselves, but the process of installing and configuring packages is outside the scope of this activity.

We will want to keep a note of the URL for a future activity where we deploy our client application.

We are using the free plan from Heroku. After thirty minutes of inactivity, our server instance will shutdown. When we want to use it again, we can make a request, and it will take a few seconds to start up again. Once we have revived the server, it will behave as expected until it notices that it is inactive for thirty minutes.