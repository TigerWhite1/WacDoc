// vendor libraries
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var socket = require('socket.io');
var fs = require('fs');
var multer = require('multer');

// custom libraries
// routes
var route = require('./route');
// model
var Model = require('./model');

var app = express();
app.use(express.static(__dirname + '/public'));

fs.realpath(__dirname+"/savefile", function(err, path) {
   if (err) {
      console.log(err);
      return;
   }
   console.log('Path is : ' + path);
});
fs.readdir(__dirname+"/public/savefile", function(err, files) {
   if (err) return;
   files.forEach(function(f) {
      console.log('Files: ' + f);
   });
});



passport.use(new LocalStrategy(function(username, password, done) {
   new Model.User({username: username}).fetch().then(function(data) {
      var user = data;
      if(user === null) {
         return done(null, false, {message: 'Invalid username or password'});
      } else {
         user = data.toJSON();
         if(!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Invalid username or password'});
         } else {
            return done(null, user);
         }
      }
   });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
}));

passport.serializeUser(function(user, done) {
 done(null, user.username);
});

passport.deserializeUser(function(username, done) {
   new Model.User({username: username}).fetch().then(function(user) {
      done(null, user);
   });
});

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/savefile');
 },
 filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
 }
});
var upload = multer({ storage : storage}).single('userPhoto');


app.post('/api/photo',function(req,res){
 upload(req,res,function(err) {
  if(err) {
   return res.end("Error uploading file.");
}
res.redirect('/home');
});
});


app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: 'secret strategic xxzzz code'}));
app.use(passport.initialize());
app.use(passport.session());

// GET
app.get('/', route.index);

// signin
// GET
app.get('/signin', route.signIn);
// POST
app.post('/signin', route.signInPost);

app.get('/doc', route.doc);

app.get('/home', route.home);

app.get('/allfile', route.allfile);
// POST
// app.post('/doc', route.doc);
// signup
// GET
app.get('/signup', route.signUp);
// POST
app.post('/signup', route.signUpPost);

// logout
// GET
app.get('/signout', route.signOut);



app.use(route.notFound404);

var server = app.listen(app.get('port'), function(err) {
   if(err) throw err;

   var message = 'Server is running @ http://localhost:' + server.address().port;
   console.log(message);
});


var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket)
{
   console.log("Une personne s'est connecter !");  

   socket.on('message', function (message, name) {
      fs.writeFile('public/savefile/'+name, message, function (err) {
         if (err) return console.log(err);
      });

      socket.broadcast.emit("message",message);
   });

   fs.readdir(__dirname+"/public/savefile", function(err, files) {
      if (err) return;
      files.forEach(function(f) {
         console.log('Files: ' + f);
      });
      io.sockets.emit('allfile', files);
   });

   socket.on('file', function (file) {
      console.log(file)

      socket.emit("file",file);
   });




});

server.listen(1337);

