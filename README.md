# Polling Tool 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1 for front-end, and with [Node.js](https://nodejs.org/en) version 14.17 for back-end.

## Content

This project contains a web application with a polling tool. As the application is open, user can see a question with a list of answers. After answering by clicking on an image representing the answer, thank you message is shown with the responses of previous users below.

## Starting the application

First we need to import our local database. For this we use the following command:
* mongoimport --db polldb --collection answers --file answerscoll.json

MongoDB Database Tools are required for this. 

When our database is ready, it's time to start our server and then client. In order to do this, navigate the command prompt to the root of a project and use these commands:
* 'node server.js' - to start the node server
* 'ng serve' - this will start Angular app

Notice that you have to use separate command prompts for above commands to be working.

## Using the application

After succesfully starting all three components (front-end, back-end and database host)

* Open browser and go to "http://localhost:4200/"
* Answer the question and see poll results after