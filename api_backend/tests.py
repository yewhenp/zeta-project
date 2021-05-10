import requests

BASE = "http://127.0.0.1:5000/"

# response = requests.get(BASE + "users/Pasha?hashed=aaa")
# print(response)

# data = {'username': 'Pasha', 'email': 'p.hilei@ucu.edu.ua', 'hashed': 'aaa'}
# response = requests.put(BASE + "users/Pasha", data)
# print(response)

response = requests.options(BASE + "users/aa")
print(response.headers)