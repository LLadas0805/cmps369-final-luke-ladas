const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


router.get('/logout', async (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
})
router.get('/login', async (req, res) => {
    res.render('login', { hide_login: true });

    const user = await req.db.findUserByUsername('cmps369');
    console.log(user)
    if (user) {
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('rcnj', salt);

    const id = await req.db.createUser('cmps369', "", "", hash);
    req.session.user = await req.db.findUserById(id);
});

router.post('/login', async (req, res) => {
    const uname = req.body.username;
    console.log(uname)
    const p1 = req.body.password;
    console.log(p1)
    const user = await req.db.findUserByUsername(uname);
    

    
    if (user && bcrypt.compareSync(p1, user.Password)) {
        req.session.user = user;
        res.redirect('/');
        return;
    } else {
        res.render('login', { hide_login: true, message: 'Could not authenticate' });
        return;
    }
});

router.get('/signup', async (req, res) => {
    req.session.user = undefined;
    res.render('signup', { hide_login: true });
});

router.post('/signup', async (req, res) => {
    const uname = req.body.username;
    const fname = req.body.FirstName
    const lname = req.body.LastName
    const p1 = req.body.password;
    const p2 = req.body.password2;
    if (p1 != p2) {
        res.render('signup', { hide_login: true, message: 'Passwords do not match!' });
        return;
    }

   
    
    const user = await req.db.findUserByUsername(uname);
    console.log(user)
    if (user) {

        res.render('signup', { hide_login: true, message: 'This account already exists!' });
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(p1, salt);

    const id = await req.db.createUser(uname, fname, lname, hash);
    req.session.user = await req.db.findUserById(id);
    res.redirect('/');
});


module.exports = router;