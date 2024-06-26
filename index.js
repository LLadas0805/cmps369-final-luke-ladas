const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const Database = require('./contactdb');
const db = new Database();
db.initialize();





const app = express();
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Gets call on every request, before the routes.
// We can inject dependencies into the req (or res)
// so the routes have access to them.
app.use((req, res, next) => {
    
    console.log("Adding DB to request");
    req.db = db;
    next();
})

app.use(session({
    secret: 'cmps369',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use((req, res, next) => {
    
    if (req.session.user) {
        res.locals.user = {
            id: req.session.user.id,
            username: req.session.user.Username
        }
    }
    next()
})



app.set('view engine', 'pug');


app.use(express.static('public'))

app.use('/', require('./routes/accounts'));
app.use('/', require('./routes/createcontact'));
app.use('/', require('./routes/main'));


app.use((req, res, next) => {
    res.status(404).send('Page was not found');
});

app.listen(8080, () => {
    console.log('Server is running  on port 8080')
});