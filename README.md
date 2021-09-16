# [Time-event-log Application](http://haoliweb.com/time-event-log/)

This application is a time management tool used to improve working efficiency. A registered user can use this App to record time and events of his or her daily. Thus, people can know exactly how their time are spend on everyday. In addition, some visual graphes can help to know whether a day is productive or not.

I originated this idea at the beginning of this pandemic. Students and employees are working at home without face-to-face supervision. In this case, people's working efficiency may suffer because of distraction on the Internet. Thus, I thought I could develop a tool to help people to monitor their time. After several months consistent efforts, I put this idea into product.

This project website is hosted [here](http://haoliweb.com/time-event-log/).

## Technologies
1. Front-end: React, Redux, Reactstrap.
2. Back-end: Node.js, Express.
3. User authentication: JSON Web Token.
4. Database: MongoDB.
5. Deployment: Backend deployed to AWS Elastic Beanstalk. 

## Key features:
1. Data visualization and timeline.
2. Local store data and reset function.
3. Save data to MongoDB database by press save button.
4. User registration and login.
5. Form validation.

## Demo
### Demo 1 Sign up and log in.
![Demo](./src/gif/login.gif "Demo")
### Demo 2 Main page and data visualization
![Demo](./src/gif/eventRows.gif "Demo")
### Demo 3 MongoDB database
![Demo](./src/gif/mongodb.gif "Demo")
 


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
 