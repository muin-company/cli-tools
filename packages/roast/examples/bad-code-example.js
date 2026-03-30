// Test file with intentional issues for roast-cli JSON testing

const userInput = "'; DROP TABLE users; --";
const query = `SELECT * FROM users WHERE id = ${userInput}`;  // SQL injection!

function processData(data) {
  for (var i = 0; i < data.length; i++) {  // var instead of let/const
    setTimeout(function() {
      console.log(data[i]);  // Closure issue
    }, 100);
  }
}

// Nested callbacks hell
fetch('/api/data')
  .then(response => {
    response.json().then(data => {
      processUserData(data).then(user => {
        saveToDatabase(user).then(result => {
          sendEmail(result).then(() => {
            console.log('Done!');
          });
        });
      });
    });
  });

// Missing error handling
async function fetchData() {
  const response = await fetch('/api/endpoint');
  return response.json();  // No try-catch!
}

// Some good code
function calculateSum(numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
