const pg = require('pg');
const cors = require('cors');
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const passportJWT = require('passport-jwt')
const bodyParser = require('body-parser');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connectionString = "postgres://sabelo:1230skm@localhost:5432/storage_system";
const client = new pg.Client(connectionString);
client.connect();

var helper = require('./routes/functions');

app.use(require('express-session')(
  {
    name: 'site_cookie',
    secret: "the cat crossed the road",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 100000
    }
  })
);

app.use(session({
  secret: "the cat crossed the road",
  resave: false,
  saveUninitialized: false
}));

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  (email, password, done) => {
    try {
      helper.findUser(email).then((user, err) => {
        if (!user) {
          return done(null, false, { message: "Incorrect Email or Password." })
        }
        bcrypt.compare(password, user.hashed_password, (err, isValid) => {
          if (err) {
            return done(err)
          }
          if (!isValid) {
            return done(null, false, { message: "Incorrect Email or Password." })
          }
          return done(null, user, { message: 'Logged In Successfully' })
        })
      })
    } catch (error) {
      return done(err)
    }
  }
))

passport.use(new JWTStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: 'your_jwt_secret'
},
  function (jwtPayload, done) {
    helper.findUser(jwtPayload.email).then((user, err) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false)
      } else {
        return done(null, false);
      }
    })
  }
));

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.headers.authorization) {
    token = req.headers.authorization;
  }
  return token;
};

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
  cb(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

function authenticationMiddleware(req, res, next) {
  if (passport.authenticate('jwt', { session: true })) {
    next()
  }
}

app.post('/businessData', authenticationMiddleware, async function (req, res) {
  try {
    await helper.insertBusinessInfo(req.body.businessName, req.body.contactName, req.body.telephone, req.body.email)
    res.status(201).end();
  } catch (error) {
    res.status(500).send("sorry cant register business info : " + `${error}`).end();
  }
});
app.get('/allAvailableLocations', authenticationMiddleware, async function (req, res) {
  try {
    var allLocations = await helper.getAllAvailableLocations();
    res.send(allLocations).status(201).end();
  } catch (error) {
    res.status(500).end();
  }
});

app.get('/locations/:searchKey', authenticationMiddleware, async function (req, res) {
  try {
    var searchKey = req.params.searchKey;
    var allLocations = await helper.getAllMatchingLocations(searchKey);
    res.send(allLocations).status(201).end();
  } catch (error) {
    res.status(500).end();
  }
});
app.get('/locationsForBusiness/:businessName', authenticationMiddleware, async function (req, res) {
  try {
    var businessName = req.params.businessName;
    const allLocations = await helper.getAllLocationsForABusiness(businessName);
    res.send(allLocations).status(201).end();
  } catch (error) {
    res.status(500).end();
  }
});
app.get('/unitTypes', authenticationMiddleware, async function (req, res) {
  try {
    const units = await client.query(`SELECT name, length, width, height FROM unit_types;`);
    res.send(units.rows).status(201).end();
  } catch (error) {
    res.status(500).end();
  }
});
app.post('/unitTypes', authenticationMiddleware, async function (req, res) {
  try {
    helper.insertUnitType(req.body)
    res.status(201).end();
  } catch (error) {
    res.status(500).end();
  }
});

app.get('/businesses', authenticationMiddleware, async function (req, res) {
  try {
    var businessNames = await helper.getAllBusinessNames();
    res.status(200).send(businessNames).end();
  } catch (error) {
    res.status(500).end();
  }
});

app.get('/businessesWithLocations', authenticationMiddleware, async function (req, res) {
  try {
    var businessNames = await helper.getAllBusinessWithLocations();
    res.status(200).send(businessNames).end();
  } catch (error) {
    res.status(500).end();
  }
});
app.get('/allUnits/:searchBy/:searchPhrase', authenticationMiddleware, async function (req, res) {
  try {
    var allUnits = await helper.getUnits(req.params);
    res.status(200).send(allUnits).end()
  } catch (error) {
    console.log('error :', error);
    res.status(500).end()
  }
});
app.post('/unit', authenticationMiddleware, async function (req, res) {
  try {
    await helper.submitUnit(req.body);
    res.status(201).end()
  } catch (error) {
    console.log('error :', error);
    res.status(500).end()
  }
});

app.post('/businessLocation', authenticationMiddleware, async function (req, res) {
  try {
    helper.insertBusinessLocation(req.body.businessName, req.body.address1, req.body.address2, req.body.city, req.body.region);
    res.status(201).end();
  } catch (error) {
    console.log('error :', error);
    res.status(500).send("sorry cant register business address : " + `${error}`).end();
  }
});
app.post('/submitBlocks', authenticationMiddleware, async function (req, res) {
  try {
    await helper.insertBlocks(req.body);
    res.status(201).end();
  } catch (error) {
    console.log('error :', error);
    res.status(500).send("sorry cant register business address : " + `${error}`).end();
  }
});
app.get('/blocks/:businessName', authenticationMiddleware, async function (req, res) {
  try {
    var businessName = req.params["businessName"];
    var allBlocks = await helper.getAllBlocks(businessName)
    res.status(201).send(allBlocks).end()
  } catch (error) {
    res.status(500).end()
  }
});
app.post('/signUp', async function (req, res) {
  try {
    var signUserUp = await helper.registerUser(req.body)
    if (!signUserUp) {
      res.status(204).end();
    }
    var userInfo = await helper.getUserInfo(req.body)
    const token = jwt.sign(userInfo, 'your_jwt_secret');
    res.json({ token }).status(201).end();
  } catch (error) {
    console.log('error :', error);
    res.status(400).end();
  }
});

app.post('/login', function (req, res, next) {
  passport.authenticate('local', { session: true }, (err, user, info) => {
    if (err || !user) {
      res.status(400).json({
        message: 'Something Went wrong, please try again later.',
        user: user
      }).end();
    }
    req.login(user, { session: true }, (err) => {
      if (err) {
        res.send(err).end();
      }
      const token = jwt.sign(user, 'your_jwt_secret');
      res.json({ info, token }).status(201).end();
    });
  })(req, res);
});

app.listen(3003, function () {
  console.log('web server listening on port 3003')
});