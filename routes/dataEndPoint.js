/*This is my router and all operations happen from here
* i require my modules that i created*/

const express = require('express');
const router = express.Router();
const fetchGitHub = require('../customModules/fetchGitHub');
const fetchGitLab = require('../customModules/fetchGitLab');
/*i am sending the user input from react using the params way, since it is not a secret or sensitive data and we
* did not use any authentication for this project and is all publicly available
* Here we use Async/await for code simplicity and also so we can set a delay of sending empty data to the front end
* we call both modules that fetched data from VCS providers API's and extract that data we then create an array of
* separate arrays inside for each modules data and then send that data over to the front end
* for a deeper look see @customModules > @fetchGitHub
* both modules are similar and only one will be commented on thoroughly*/
router.post('/username/:username', async function (req, res) {
    /*first i get the username from request*/
    const username = req.params.username;
    const gitHubData = await fetchGitHub(username);
    const gitLabData = await fetchGitLab(username);
    const infoArray = [gitHubData, gitLabData];
    res.send(infoArray);
});

module.exports = router;