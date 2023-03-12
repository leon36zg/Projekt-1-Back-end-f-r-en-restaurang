const fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var users = null;

  try {
    // Read the content of the 'users.json' file and parse it as JSON
    var rawData = fs.readFileSync('users.json');
    users = JSON.parse(rawData);
  } catch (err) {
    // If there is an error, send an error message and return
    res.send('Error when retrieving from database');
    return;
  }

  // Loop through the users array and find the user with username 'keny'
  for (const user of users) {
    if (user.username == "leonvidos36") {
      // Render the 'profile' view with the user data and return
      res.render('profile', user);
      return;
    }
  }

  // If no user with the given username is found, send an error message
  res.send('Error keny not found');
});

router.post('/', function(req, res, next) {
  var users = null;

  try {
    // Read the content of the 'users.json' file and parse it as JSON
    var rawData = fs.readFileSync('users.json');
    users = JSON.parse(rawData);
  } catch (err) {
    // If there is an error, send an error message and return
    res.send('Error when retrieving from database');
    return;
  }

  var actualUser = null;

  // Loop through the users array and find the user with id '00000000'
  for (const user of users) {
    if (user.id == "00000000") { 
      actualUser = user;
    }
  }

  // If the old password provided by the user does not match the actual user's password,
  // render the 'profile' view with an error message
  if (actualUser.password != req.body.old_password) {
    res.render('profile', Object.assign(actualUser, { errorMsg: "Old password is wrong. Please try again!" }));
  } else {
    // Otherwise, create a new user object with the updated information
    var updatedUser = {
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    }
    
    // Call the addUser function to update the user in the users array
    addUser("00000000", updatedUser, users);
    
    // Save the updated users array to the 'users.json' file
    save(users);
    
    // Render the 'profile' view with a success message
    res.render('profile', Object.assign(updatedUser, { errorMsg: "Profile info update!" }));
  }
});

// Function to update a user in the users array
function addUser(id, userToAdd, usersList) {
  // Find the index of the user with the given id
  var objIndex = usersList.findIndex((obj => obj.id == id));

  // Update the user at the given index with the new user data
  usersList[objIndex] = userToAdd
  usersList[objIndex].id = id;
  
  console.log(usersList)
}

// Function to save the updated users array to the 'users.json' file
function save(usersList) {
  let dataToSave = JSON.stringify(usersList);
  fs.writeFileSync('users.json', dataToSave);
}

// Export the router object to be used in other modules
module.exports = router; 



