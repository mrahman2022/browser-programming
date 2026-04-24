# Lecture 7 - REST API Fetch Users

## What I implemented
- Fetched user data from a public REST API using `fetch()`
- Converted the response to JSON using `response.json()`
- Displayed each user's name, email, and city
- Accessed the nested field `user.address.city`
- Added error handling with `try/catch` and `response.ok`
- Displayed results both in the page and in the output area

## How to test
- Open `exercise.html`
- Click the **Load Users** button
- Check that the users are shown in the page and in the output area

## Reflection

### 1. What does `fetch()` return?
`fetch()` returns a Promise. The Promise resolves to a Response object when the request is completed.

### 2. Why do we use `response.json()`?
We use `response.json()` to convert the JSON response into JavaScript data. This makes it possible to work with the returned users as normal objects and arrays.

### 3. Why must we check `response.ok`?
We check `response.ok` to make sure the request was successful. Without it, the code might continue even when the server returns an error such as 404.
