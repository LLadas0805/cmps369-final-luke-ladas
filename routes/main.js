const express = require('express');
const router = express.Router();

const logged_in = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send("Not authorized");
    }
}

router.get('/', async (req, res) => {
    
    let contact = await req.db.findContacts();
    
    
    res.render('main', {contacts: contact});
});


router.get('/', async (req, res) => {
    res.redirect('/createcontact');
});
router.get('/:id', async (req, res) => {
    const contact = await req.db.findContactById(req.params.id);
    if (contact != undefined) {
        res.render('contactinfo', { contact: contact });
    } else {
        res.status(404).send('Page was not found');
    }
    
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
    const contact = await req.db.updateContactById(req.params.id, req.body);
    res.db = contact
    res.redirect('/');
    return;
});


module.exports = router;