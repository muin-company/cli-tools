# SQL injection vulnerability example
import sqlite3

def get_user(username):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    # DANGER: String concatenation with user input
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)
    
    result = cursor.fetchone()
    conn.close()
    return result

# This could be exploited with: username = "admin' OR '1'='1"
user = get_user(input("Enter username: "))
print(user)
