# Authentication

![Auth options](https://res.cloudinary.com/practicaldev/image/fetch/s--E8zZp5HG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/j3895f9bhxkqghbgdmgi.PNG)

Above is a high-level overview of the main authentication choices available to developers today. Here is a quick overview of each:

**Session Based Authentication** - Utilizes browser Cookies along with backend "Sessions" to manage logged-in and logged-out users.
**JWT Authentication** - A stateless authentication method where a JSON Web token (JWT) is stored in the browser (usually localStorage). This JWT has assertions about a user and can only be decoded using a secret that is stored on the server.
**OAuth and OpenID Connect Authentication** - A modern authentication method where an application uses "claims" generated from other applications to authenticate its own users. In other words, this is federated authentication where an existing service (like Google) handles the authentication and storage of users while your application leverages this flow to authenticate users.

## Session based

#### Cookies

If we have a protected webpage that we want our users to login to access, without cookies, those users would have to login every time they refresh the page! That is because the HTTP protocol is by default "stateless".

Cookies introduce the concept of "persistent state" and allow the browser to "remember" something that the server told it previously.

So, if we want our server to "remember" this user is authenticated, we can send the client a `SET_COOKIE` header after they have authenticated, then, the client will be able to use that cookie when ever making requests to the server.

example:

```
  Set-Cookie: made_up_cookie_name=some value; expires=Thu, 28-Dec-2020 20:44:50 GMT;
```

_An overly simplified process of how this might work would be:_

1. Random person from the coffee shop types `www.example-site.com/login/` into the browser
2. Random person from the coffee shop fills out a form on this page with a username and password
3. Random person's Google Chrome Browser submits a `POST` request with the login data (username, password) to the server running `www.example-site.com``.
4. The server running `www.example-site.com` receives the login info, checks the database for that login info, validates the login info, and if successful, creates a response that has the header `Set-Cookie: user_is_authenticated=true; expires=Thu, 1-Jan-2020 20:00:00 GMT.`
5. The random person's Google Chrome browser receives this response and sets a browser cookie:

| Name                  | Value | Expires / Max-age        |
| --------------------- | ----- | ------------------------ |
| user_is_authenticated | true  | 2020-12-28T20:44:50.674Z |

6. The random person now visits www.example-site.com/protected-route/
7. The random person's browser creates an HTTP request with the header `Cookie: user_is_authenticated=true; expires=Thu, 1-Jan-2020 20:00:00 GMT` attached to the request.
8. The server receives this request, sees that there is a cookie on the request, "remembers" that it had authenticated this user just a few seconds ago, and allows the user to visit the page.

#### Sessions

Sessions and cookies are actually quite similar and can get confused because they can actually be used together quite seamlessly.

- A Cookie is set by the server, but **stored in the Browser**.
- A session is set by the server, stored in the DB (or memory)

the main difference between a cookie and a session is where they are stored. A session is stored in some Data Store (fancy term for a database) while a Cookie is stored in the Browser. Since the session is stored on the server, it can store sensitive information. Storing sensitive information in a cookie would be highly insecure.

### Session based Login Flow:

1. User visits your Express application and signs in using his username and password
2. The username and password are sent via POST request to the /login route on the Express application server
3. The Express application server will retrieve the user from the database (a hash and salt are stored on the user profile), take a hash of the password that the user provided a few seconds ago using the salt attached to the database user object, and verify that the hash taken matches the hash stored on the database user object.
4. If the hashes match, we conclude that the user provided the correct credentials, and our passport-local middleware will attach the user to the current session.
5. For every new request that the user makes on the front-end, their session Cookie will be attached to the request, which will be subsequently verified by the Passport middleware. If the Passport middleware verifies the session cookie successfully, the server will return the requested route data, and our authentication flow is complete.

Notice the fact that the user only had to type in his username and password one time, and for the remainder of the session, they can visit protected routes. The session cookie is automatically attached to all of his requests because this is the default behavior of a web browser and how cookies work! In addition, each time a request is made, the Passport middleware and Express Session middleware will be making a query to our database to retrieve session information. In other words, **to authenticate a user, a database is required**.

with JWT, there is absolutely no database required on each request to authenticate users. we will need to make one database request to initially authenticate a user and generate a JWT, but after that, the JWT will be attached in the ==Authorization== HTTP header (as opposed to ==Cookie== header), and no database is required.

## JWT Approach

a JSON Web Token (JWT) is just a small piece of data that contains information about a user. It contains three parts:

1. Header
2. Payload
3. Signature

Each part is encoded in Base64url format (easier to transport over HTTP protocol than JSON objects).

Here is an example JWT:

```
  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA
```

Notice how there are periods . within this text. These periods separate the header from the payload from the signature which have been base64 encoded and contain all of the information we would need to "remember" this user's authentication.

We can use the `base64url` npm package to decode the key.

```js

# Header
## The header has both an alg and typ property. These are both in the JWT because they represent "instructions" for interpreting that messy signature.


{
    "alg":"RS256",
    "typ":"JWT"
}

# Payload
{
    "sub":"1234567890", // sub - An abbreviation for "subject", and usually represents the user ID in the database
    "name":"John Doe", // name - Just some arbitrary metadata about the user
    "admin":true, // admin - Some more arbitrary metadata about the user
    "iat":1516239022 // iat - An abbreviation for "issued at", and represents when this JWT was issued
}

# Signature
Lots of gibberish like - ��e宿���(�$[����4\e�'
```

you can see the list of params that could be included here [JWT Spec](https://tools.ietf.org/html/rfc7519#section-4.1)

### JWT Auth flow
#### Registration
1. User signs up on the client and the browser sends a request to the server to register the user
2. Server creates a new user, hashes the password and stores it in the database. 
3. Then, the server issues a JWT, signs it a crptographic algorythm then returns it to the user.
4. On subsequent requests the user will send the JWT to the server any time it needs to access a secure / private route

#### Login
1. Server receives login credentials
2. Server performs logic to verify the credentials are valid
3. If valid, the server issues and signs a JWT, then returns it to the user in the response
4. The user uses the issued JWT to authenticate future requests in the browser

### Simplifying the "signing" and "verifying" step

Unfortunately and fortunately, there are many ways that you can successfully implement JWTs into your application. Because of this, if you search Google for "how to implement JWT in an Express App", you'll get a variety of implementations. Let's take a look at our options from most complex to least complex.

**Most Complex**: If we wanted to make this process as complicated (but also as transparent) as possible, we could use the signing and verifying process that we used earlier in this post using the built-in Node crypto library. This would require us to write a lot of Express middleware, a lot of custom logic, and a lot of error handling, but it could certainly be done.

**Somewhat Complex:** If we wanted to simplify things a little bit, we could do everything on our own, but instead of using the built-in Node crypto library, we could abstract away a lot of complexity and use the popular package jsonwebtoken. This is not a terrible idea, and there are actually many tutorials online that show you how to implement JWT authentication using just this library.

**Simple (if used correctly):** Last but not least, we could abstract away even more complexity and use the passport-jwt strategy. Or wait... Don't we need the passport-local strategy too since we are authenticating with usernames and passwords? And how do we generate a JWT in the first place? Clearly, we will need the jsonwebtoken library to do this...


In total, the basic flow will look like this: 

1. User logs in with username and password
2. Express server validates the username and password, signs a JWT, and sends that JWT back to the user.
3. The user will store the JWT in the browser (this is where our Angular app comes in) via localStorage.
4. For every request, Angular will add the JWT stored in localStorage to the Authorization HTTP Header (similar to how we stored our session in the Cookie header)
5. For every request, the Express app will run the passport.authenticate() middleware, which will extract the JWT from the Authorization header, verify it with a Public Key, and based on the result, either allow or disallow a user from visiting a route or making an API call.


### How does the front end use JWTs?
If you remember from session based auth, HTTP Cookies are automatically sent with every HTTP request (until they expire) after the Set-Cookie HTTP header has set the value of them. With JWTs, this is not the case!

So with JWTs We have two options:

1. We can "intercept" each HTTP request from our React application and append the Authorization HTTP Header with our JWT token
2. We can manually add our JWT token to each request

Once we've build the backend, we'll also need to build a way on the client to keep track of the user's authenticated state


==Disclaimer==
Blog post on the dangers of using JWTs for user sessions:
[JSON Web Tokens (JWT) are Dangerous for User Sessions — Here’s a Solution](https://redis.com/blog/json-web-tokens-jwt-are-dangerous-for-user-sessions/)