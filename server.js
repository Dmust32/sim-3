const express= require('express')
const bodyParser= require('body-parser')
const massive= require('massive');
const cors= require('cors')
const session= require('express-session')
const Auth0Strategy = require('passport-auth0')
const passport= require('passport')

require('dotenv').config();

const port = 5050
const app = express();

massive(process.env.CONNECTION_STRING).then(db=> {
    app.set('db', db)
}).catch(err => {
    console.error(err);
})

// CONTROLLERS
const controller= require('./controller')

// MIDDLEWARE
app.use(bodyParser.json());
app.use( cors());

app.use( session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave:false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new Auth0Strategy(
    {
        domain: process.env.AUTH_DOMAIN,
        clientID: process.env.AUTH_CLIENT_ID,
        clientSecret: process.env.AUTH_CLIENT_SECRET,
        callbackURL: process.env.AUTH_CALLBACK,
        scope: 'profile email'

    },
    function(accessToken, refreshToken, extraParams, profile, done){
        const db= app.get('db');
        db.get_user_by_email({ email: profile.emails[0].value }).then(results => {
            let user = results[0];
            
    
            if (user) {
            console.log(1111111111, user)
              return done(null, user);
            } else {
            
              let userObj = {
                name: profile.displayName,
                email: profile.emails[0].value
              }
              console.log(22222222222, userObj);
    
              db.create_user(userObj).then(results => {
                let user = results[0];
                console.log(333333333, user)
                return done(null, user);
            }).catch(error => console.log("error",error)); 
        }
    })}
));

passport.serializeUser((user, done) => {
    return done(null, user);
});

passport.deserializeUser((user, done) => {
    return done(null, user)
  });


  app.get("/auth", passport.authenticate("auth0"));
  app.get(
    "/auth/callback",
    passport.authenticate("auth0", {
      successRedirect: "http://localhost:3000/dashboard",
      failureRedirect: "http://localhost:3000"
    })
  );

//   app.get("/auth/me", (req, res) => {
//     if (req.isAuthenticated()) {
//       return res.send(req.user);
//     } else {
//       return res.status(404).send("user not authenticated");
//     }
//   });



app.listen( port, () => console.log('listening on port', port))