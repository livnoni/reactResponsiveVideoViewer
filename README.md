
  
# React Responsive Video App  

### For viewing full deployed Application - click [here](https://reactresponsivevideoviewer.firebaseapp.com/) .
  
### Info  
This is a very simple client server application that present responsive video container to embedded videos such as Facebook, Youtube and regular source video.  
  
### How to use?  
##### Client Side:  
Move to the client folder:<br />  
On the root folder: `$ cd /client` <br />  
Run: `$ npm install`<br />  
Run: `$ npm start`<br />  
right now the client runs on the localhost with port 3000: [http://localhost:3000](http://localhost:3000)  
  
##### Server Side:  
Move to the server folder:  
On the roort folder: `$ cd /server`<br />  
Run: `$ npm install`<br />  
Run: `$ npm start`<br />  
Right now the server runs on the localhost with port 8000: [http://localhost:8000](http://localhost:*000)  
  
### How it works?  
- The client use pure React without any React UI framework.  
- The Application is responsive to mobile and desktop view.  
- The Server use a very simple GraphQL queries in order to returns the relevant videos to the client.  
- Both folders (client and server) contains tests (client- integration test using puppeteer, server- uni tests) you can run it by execute: `$ npm run test` on the relevant directory.<br/>  
<br/><br/>Note: Before run the test, make sure server is up!
