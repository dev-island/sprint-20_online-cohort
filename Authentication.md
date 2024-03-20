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

*An overly simplified process of how this might work would be:*

1. Random person from the coffee shop types `www.example-site.com/login/` into the browser
2. Random person from the coffee shop fills out a form on this page with a username and password
3. Random person's Google Chrome Browser submits a `POST` request with the login data (username, password) to the server running `www.example-site.com``.
4. The server running `www.example-site.com` receives the login info, checks the database for that login info, validates the login info, and if successful, creates a response that has the header `Set-Cookie: user_is_authenticated=true; expires=Thu, 1-Jan-2020 20:00:00 GMT.`
5. The random person's Google Chrome browser receives this response and sets a browser cookie:

| Name      | Value | Expires / Max-age |
| ----------- | ----------- | -----------|
| user_is_authenticated      | true       | 2020-12-28T20:44:50.674Z

6. The random person now visits www.example-site.com/protected-route/
7. The random person's browser creates an HTTP request with the header `Cookie: user_is_authenticated=true; expires=Thu, 1-Jan-2020 20:00:00 GMT` attached to the request.
8. The server receives this request, sees that there is a cookie on the request, "remembers" that it had authenticated this user just a few seconds ago, and allows the user to visit the page.

#### Sessions
Sessions and cookies are actually quite similar and can get confused because they can actually be used together quite seamlessly.

- A Cookie is set by the server, but **stored in the Browser**.
- A session is set by the server, stored in the DB (or memory)

 the main difference between a cookie and a session is where they are stored. A session is stored in some Data Store (fancy term for a database) while a Cookie is stored in the Browser. Since the session is stored on the server, it can store sensitive information. Storing sensitive information in a cookie would be highly insecure.