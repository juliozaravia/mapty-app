# Mapty App
## 1. What is Mapty App?
Mapty is an application that allows you to record the location, day, time and other data of the workouts we do. The available workouts are Running and Cycling. Once registered the workouts can be shown on a map.

## 2. How was it programmed?
The Mapty UI (HTML / CSS) was developed by [Jonas Schmedtmann for his GREAT JavaScript course on Udemy](http://www.juliozaravia.com/git-images/mapty_git.jpg "Jonas Schmedtmann for his great JavaScript course on Udemy"). The JavaScript code used was made by me **following the guide of Jonas in the mentioned course**. 

**Additionally I refactored the code to improve readability and added functionality that I thought was necessary.** The current project follows the following structure:

![Mapty Structure](http://www.juliozaravia.com/git-images/mapty_git.jpg "Mapty Structure")

**The modifications made were as follows:**
- Code refactoring using modules.
- Creation of Communicator class to manage notifications to the user.
- Helper class creation to handle minor validations required by other methods.

## 3. Note about `Navigator.geolocation`.
The application uses the `Navigator.geolocation` feature to access the location of the device. **This feature is available only in secure contexts (HTTPS)**.

To simulate a server and be able to do the respective tests I used the 'Live Server' plugin from the VSCode IDE. However, this plugin doesn't allow the use of HTTPS.

To solve this problem, a local SSL certificate must be created. You can do it by following the steps in this tutorial: [Add HTTPS support to VSCode Live Server](https://www.youtube.com/watch?v=v4jgr0ppw8Q "Add HTTPS support to VSCode Live Server").

## 4. Anything else?
- All constructive criticisms are very well received, you can send them to me at julio.zaravia.dev@gmail.com or hey@juliozaravia.com.
- If you're going to criticize this project in an offensive way, please don't do it, remember that no one comes to this world knowing everything.
- If you want to improve the code, you're free to do so, just let me know what you changed or improved so I can learn from you.
- I know my English is a bit poor, but I'm improving little by little. Thanks for understand.
- That's it, I really liked learning from this project and refactoring it, if you took the time to read this, you're a good person and I wish you a good day.
