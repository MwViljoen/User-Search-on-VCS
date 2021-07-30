/* this module works similar to the github module (@fetchGitHub.js in @customModules folder) only
* difference is the api and how to get the necessary data. Only the differences will be explained
* more info in the @fetchGitHub module */

require('isomorphic-fetch');

module.exports = async function fetchGitHubData(username){
    /*in this api we first need to go see if user exists if we receive an empty datapack we know the user
    * does not exist in gitlab thus the if else is used in line 21
    * the try catch is just in case the API/ VCS provider made changes to their API
    * all try catch blocks are the in case of fetch error*/
    const userURL = `https://gitlab.com/api/v4/users?username=${username}`
    let dataPackObject1;
    try{
        const dataPack1 = await fetch(userURL);
        dataPackObject1 = await dataPack1.json();
    } catch (e){
        return [`If you see this error contact Service Provider, ${e}`];
    }
    /*if empty we know nothing found*/
    if(dataPackObject1.length === 0){
        return [`Username not found`];
    }
    else{
        /*if username exists we simply fetch the id of that username to get the data related to the user*/
        let userID;

        /*here we fetch the user details with id obtained from @dataPackObject1
        * this includes links to repos and other user related data such as bio etc.*/
        let userProfileURL;
        let dataPackObject2;
        try{
            userID = dataPackObject1[0].id;
            userProfileURL = `https://gitlab.com/api/v4/users/${userID}`
            const dataPack2 = await fetch(userProfileURL);
            dataPackObject2 = await dataPack2.json();
        } catch (e){
            return `If you see this error contact Service Provider, ${e}`;
        }

        /*then we find all repositories/projects related to user that are public*/
        const userRepoURL = `https://gitlab.com/api/v4//users/${userID}/projects`
        let dataPackObject3
        try{
            const dataPack3 = await fetch(userRepoURL);
            dataPackObject3 = await dataPack3.json();
        } catch (e){
            return `If you see this error contact Service Provider, ${e}`;
        }

        let repoInfoArray = [];
        let placeholder = {}

        for(let i = 0;i < dataPackObject3.length; i++){
            placeholder = {
                repoName: dataPackObject3[i].name,
                repoDescription: dataPackObject3[i].description,
                repoCreated: dataPackObject3[i].created_at,
                repoUpdated: dataPackObject3[i].last_activity_at,
                repoURL: dataPackObject3[i].web_url
            }
            repoInfoArray.push(placeholder);
        }
        /*Note not all API's provide the same data thus at @publicRepoNr in custom Object below
        * we return a static value to not keep it empty*/
        return [
            {
                userInfo: {
                    userName: dataPackObject2.username,
                    profileImg: dataPackObject2.avatar_url,
                    gitBio: dataPackObject2.bio,
                    gitProfileLink: dataPackObject2.web_url,
                    publicRepoNr: 'GitLab does not provide number of public repos',
                    createdOn: dataPackObject2.created_at
                },
                repoInfo: repoInfoArray
            }
        ];
    }

}
