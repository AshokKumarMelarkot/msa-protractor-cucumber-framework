# msa-protractor-cucumber-framework


•	This is Customized framework to write automation tests for angular and non-angular applications.<br>
•	Ease to write tests and ease to maintain.<br>
•	The project is basically created to maintain and organize the object oriented of automation tests.<br>
•	Here test resources defined and these are kind of helpers to developers to place generic code.<br>
•	Currently the test resources contains below features and we ca extend according to usage<br>
  	&nbsp;&nbsp;►&nbsp; Utility file where we place regular functions / methods (playing with data types like strings arrays and lodash)<br>
  	&nbsp;&nbsp;►&nbsp;  Assertions file where we place our customized meaningful assertions using chai library.<br>
  	&nbsp;&nbsp;►&nbsp;  WebElementInteraction file contains all the actions performed on element level.<br>
 		&nbsp;&nbsp;►&nbsp; BrowserInteractions file contains all the actions performed on driver level.<br>
<br><br>
Current Framework are composed by the below tech debt.<br>
  &nbsp;&nbsp;•	&nbsp;Cucumber (BDD framework)<br>
  &nbsp;&nbsp;•	&nbsp;	Protractor<br>
  &nbsp;&nbsp;•	&nbsp;	Typescript<br>
  &nbsp;&nbsp;•	&nbsp;	Gulp <br>
  &nbsp;&nbsp;•	&nbsp;	Chai library for Assertions<br>
  &nbsp;&nbsp;•	&nbsp;	Customized framework to implement ease to write tests and ease to maintain.<br>
  &nbsp;&nbsp;•	&nbsp;	Many node_modules used as mentioned in package.json.<br>

<br><br>

<b>How to write tests :<br>

<img src="https://user-images.githubusercontent.com/19589895/30644756-1a4411e6-9e31-11e7-81e7-43a8d629fcd5.png" height="400" width="600"><br>
 
&nbsp;&nbsp;►&nbsp;  Run <b>gulp Protractor</b> command from command line to run the feature/scenario.<br>
&nbsp;&nbsp;►&nbsp;  Run <b>gulp Generate-TestResult</b> command from command in order to create html report for execution.<br>
 
<img src="https://user-images.githubusercontent.com/19589895/30644762-1fc0c970-9e31-11e7-9845-569e7f97fc0c.png" height="400" width="600"><br>

<br><br><br><br>

<b>Prerequisites :</b><br>
&nbsp;&nbsp;•	►&nbsp;  Java (this implemented with Java 1.8.0_101)<br>
&nbsp;&nbsp;•	►&nbsp;  Install Nodejs (this implemented with Node : v6.9.1)<br>
&nbsp;&nbsp;•	►&nbsp; OS : Windows / Linux / Mac<br>

<br><br>

<b>How to Set UP :</b><br>
Once Java and Node set up in your machine please set the path variables respectively.<br>
Clone the repo in to your machine<br>
![image](https://user-images.githubusercontent.com/19589895/30639039-fe5b6b48-9e1a-11e7-88b1-2ae97f5ef5cf.png)<br>
Navigate to the repository folder in command line.<br>
Run <b>npm install</b> command.<br>
![image](https://user-images.githubusercontent.com/19589895/30639050-049804da-9e1b-11e7-9184-9c8ff7932007.png) <br>
Install Chrome version < 56.0.2924.87<br>
Implement your test and run as given in above section.<br>



