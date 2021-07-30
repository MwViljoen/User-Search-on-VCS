/*we need to acquire isometric fetch to use the fetch method that returns a promise*/
require('isomorphic-fetch');
/*here is a module created to handle the fetch and data manipulations of Github
* firstly the function is async because we are using a promise and we want to use await to wait
* for the data first before continuing*/
module.exports = async function fetchGitHubData(username){
    /*here we first create a url with the name received from frontend*/
    const userURL = `https://api.github.com/users/${username}`;
    /* we then send the api request using above url and wait for the response
    * and store the data in @dataPack1, @dataPack1 is not in the form we want to be able to access the data
    * so we convert the data into a json Object to be able to access the data and store it in
    * @dataPackObject1*/
    let dataPackObject1;
    try{
        const dataPack1 = await fetch(userURL);
        /*the conversion from @dataPack1 to @dataPackObject1 is also a promise in itself and we need to wait for it to
        * finish in order to access the data thus the await*/
        dataPackObject1 = await dataPack1.json();
    }catch (e){
        return [`If you see this error contact Service Provider, ${e}`];
    }
    /*here we first check if the api found the user if not we simply return user not found*/
    if(dataPackObject1.message === 'Not Found'){
        return [`Username not found`];
    }
    /*how ever if user is found we will continue with our operations*/
    else{
        /*here we go fetch more data on the user if user exists, we use the repo api link received
        * from the @dataPackObject1 and fetch all the repos related to the user and store the data in the
        * @ dataPackObject2 in Object format
        * note the await here as well for the fetch and the conversion to .json()*/
        let dataPackObject2;
        try{
            const dataPack2 = await fetch(dataPackObject1.repos_url);
            dataPackObject2 = await dataPack2.json();
        } catch (e){
            return [`If you see this error contact Service Provider, ${e}`];
        }
        /* @repoInfoArray is the desired accumulative extracted data and is stored here for each repo*/
        let repoInfoArray = [];
        /* @placeholder is a custom object and stores the desired data for the current index of the loop*/
        let placeholder = {}
        /* this loop runs through all repos and acquires all desired data, names are according to dataPackObject*/
        for (let i = 0; i < dataPackObject2.length; i++) {
            placeholder = {
                repoName: dataPackObject2[i].name,
                repoDescription: dataPackObject2[i].description,
                repoCreated: dataPackObject2[i].created_at,
                repoUpdated: dataPackObject2[i].updated_at,
                repoURL: dataPackObject2[i].html_url
            }
            /*when finished with extracting data we add the object to @repoInfoArray  using the standard push*/
            repoInfoArray.push(placeholder);
        }
        /*we return an Custom Object
        * userInfo is all info related to the user such as bio and image etc.*/
        return [
            {
                userInfo: {
                    userName: dataPackObject1.login,
                    profileImg: dataPackObject1.avatar_url,
                    gitBio: dataPackObject1.bio,
                    gitProfileLink: dataPackObject1.html_url,
                    publicRepoNr: dataPackObject1.public_repos,
                    createdOn: dataPackObject1.created_at
                },
                repoInfo: repoInfoArray
            }
        ];
    }
}
