const express = require('express');
const router = express.Router();
const geo = require('node-geocoder');
const geocoder = geo({ provider: 'openstreetmap' })

const logged_in = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send("Not authorized");
    }
}

router.get('/', async (req, res) => {
    
    let contact = await req.db.findContacts();
    let account;
    if (req.session.user) {
        account = 1;
    } else {
        account = 0;
    }
    

    res.render('main', {contacts: contact, account: account});
});


router.get('/', async (req, res) => {
    res.redirect('/createcontact');
});
router.get('/:id', async (req, res) => {
    
    res.status(404).send('Page was not found');
    
    
});

router.get('/:id/delete', logged_in, async (req, res) => {
    const contact = await req.db.findContactById(req.params.id);
    res.render('delete', { contact: contact });
});

router.post('/:id/delete', logged_in, async (req, res) => {
    const contact = await req.db.deleteContactById(req.params.id);
    res.db = contact
    res.redirect('/');
    return;
});

router.get('/:id/edit', logged_in, async (req, res) => {
    const contact = await req.db.findContactById(req.params.id);
    res.render('edit', { contact: contact });
});

router.post('/:id/edit', logged_in, async (req, res) => {

    const result = await geocoder.geocode(req.body.Address);

    if (result.length > 0) {
        req.db.updateContactById(req.params.id, req.body, result[0].formattedAddress, result[0].latitude, result[0].longitude);
    } else {

        const contact = await req.db.findContactById(req.params.id);
        res.render('edit', { contact: contact, hide_login: true, message: 'Could not find address, please be more specific!' });
        return;
        
    }
    
    res.redirect('/');
 
});




module.exports = router;