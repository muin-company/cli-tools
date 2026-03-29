// Updated: 2026-03-29
function processData(data) {
  return data
    .filter(item => item.active)
    .filter(item => item.age > 18)
    .filter(item => item.name && item.name.trim())
    .map(item => ({
      name: item.name,
      age: item.age,
      email: item.email || "no email"
    }));
}

// Encapsulated state with class
class UserManager {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
    console.log(`Added user ${user.name}, total: ${this.users.length}`);
    return user;
  }

  getUsers() {
    return [...this.users]; // Return copy to prevent mutation
  }

  get count() {
    return this.users.length;
  }
}

const userManager = new UserManager();
