const geo = require('node-geocoder');
const geocoder = geo({ provider: 'openstreetmap' })
const express = require('express');
const router = express.Router();

router.get('/createcontact', async (req, res) => {
    res.render('createcontact');
});

router.post('/createcontact', async (req, res) => {

    const result = await geocoder.geocode(req.body.Address);

    if (result.length > 0) {
        req.db.createContact(req.body, result[0].formattedAddress, result[0].latitude, result[0].longitude);
    } else {

       
        res.render('createcontact', { hide_login: true, message: 'Could not find address, please be more specific!' });
        return;
        
    }
    
    res.redirect('/');
    
})

module.exports = router;