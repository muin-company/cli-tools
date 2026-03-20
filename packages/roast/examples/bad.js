// TODO: fix this later (added 2019)
function processData(d) {
  var result = [];
  for (var i = 0; i < d.length; i++) {
    if (d[i].active == true) {
      if (d[i].age > 18) {
        if (d[i].name != null) {
          if (d[i].name != undefined) {
            if (d[i].name != "") {
              result.push({
                n: d[i].name,
                a: d[i].age,
                e: d[i].email ? d[i].email : "no email"
              });
            }
          }
        }
      }
    }
  }
  return result;
}

// "temporary" global state
var GLOBAL_USERS = [];
var GLOBAL_COUNT = 0;
var temp = null;

function addUser(user) {
  GLOBAL_USERS.push(user);
  GLOBAL_COUNT = GLOBAL_COUNT + 1;
  temp = user;
  console.log("added user " + user.name + " total: " + GLOBAL_COUNT);
}
