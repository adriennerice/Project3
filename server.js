const express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const app = express();
const PORT = 5000;
const routes = require('./routes');
const db = require('./models')

// middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Commented this out for login purposes
// app.use(cookieParser());
// app.use(session({
//     key: 'user_sid',
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 600000
//     }
// }));

// if browser=alive but server=dead.. clears cookie info in browser
// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.user){
//         res.clearCookie('user_sid')
//     }
//     next();
    
// });

// Add routes for API and view
app.use(routes);



if(process.env.NODE_ENV === "production") {
    console.log('hey');
    app.use(express.statis("client/build"));
}
// syncing our sequelize models and starting our express app. 
// Start the API server
db.sequelize.sync({force: false}).then(function() {
    app.listen(PORT, function() {
        console.log('API Server now listening on ' + PORT);
    })
})
