
var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser");
    mongoose     = require("mongoose")
//Requiring routes
var indexRoutes = require("./routes/index");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});
// app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + "/public")); 
app.set("view engine", "ejs");
// app.use(methodOverride("_method"));
// app.use(flash());

// app.use(require("express-session")({
//     secret: "news app!!!",
//     resave: false,
//     saveUninitialized: false,
// }));

// app.use(function(req, res, next){
//     res.locals.currentUser ;
//     res.locals.error = req.flash("error");
//     res.locals.success = req.flash("success");
//     next();
// });

app.use(indexRoutes);

// if (localStorage.jwtToken) {
//     // Set auth token header auth
//     setAuthToken(localStorage.jwtToken);
//     // Decode token and get user info and exp
//     const decoded = jwt_decode(localStorage.jwtToken);
//     // Set user and isAuthenticated
//     currentUser= decoded;
  
//     // Check for expired token
//     const currentTime = Date.now() / 1000;
//     if (decoded.exp < currentTime) {
//       // Remove token from localStorage
//       localStorage.removeItem('jwtToken');
//       // Remove auth header for future requests
//       setAuthToken(false);
      
//       currentUser=null;

//     }

// }
// DB Config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
//  seeddb();
app.listen(process.env.PORT ||8000,function(){

    console.log("E-Commerce Admin panel has started");
});


