import express from 'express';
import { userById, isAdmin, isAuth, requireSignin } from '../controllers/auth';
import { list, create, contactById, read, remove } from '../controllers/contact';
///
const router = express.Router();


// add contact
router.post('/contactAdd', create);
// list contact
router.get('/contactList', list);
// detail contact
router.get('/contact/:contactId', read);
// update contact
// router.put('/contactUpdate/:contactId', update);
// delete contact
router.delete('/contact/delete/:contactId/:userId', requireSignin, isAuth, isAdmin, remove);
//param
router.param('userId', userById)
router.param('contactId', contactById);

module.exports = router;