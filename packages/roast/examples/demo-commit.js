// TODO: This works for now, will fix later
function getUserData(id) {
  console.log("DEBUG: fetching user", id);
  
  // Quick fix for production bug
  if (id == null || id == undefined || id == "") {
    return null;
  }
  
  var data = fetch("/api/users/" + id)
    .then(r => r.json())
    .then(d => d.data)
    .then(x => {
      console.log("DEBUG: got data", x);
      return x;
    })
    .catch(e => {
      console.log("ERROR:", e);
      return null;
    });
  
  return data;
}

// Global state (temporary)
var CURRENT_USER = null;

function setCurrentUser(user) {
  CURRENT_USER = user;
  console.log("DEBUG: current user set");
}
