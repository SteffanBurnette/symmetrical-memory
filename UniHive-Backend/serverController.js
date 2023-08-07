require("dotenv").config();
const session = require("express-session");
//const RedisStore = require("connect-redis")(session);



//Establishes the session middle ware
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,  //With the generated cookie in the SESSION_SECRET can now use req.session to save and retrieve session data in your route handlers.
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000 // 1 hour
    },
  });

  //Establishes the wrap so that socket.io can use the session middleware
const wrap = expressMiddleware => (socket, next) =>
  expressMiddleware(socket.request, {}, next);

  //Establishes the cors
const corsConfig = {
        origin: ["*"],
        methods: ["GET", "POST", "PATCH", "DELETE"],
     
};

module.exports = { sessionMiddleware, wrap, corsConfig };