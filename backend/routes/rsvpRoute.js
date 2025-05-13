const express = require('express');
const router = express.Router({ mergeParams: true });
const rsvpsController = require('../controllers/rsvpController');
const requireAuth = require('../auth');

router.use(requireAuth);

// RSVP to an event
router.post('/:id/rsvp',    rsvpsController.rsvp);
//undo rsvp and delete from db
router.delete('/:id/rsvp',  rsvpsController.unrsvp);
// rsvp list for event page
router.get('/:id/rsvplist',    rsvpsController.listEventRsvps);

// user rsvp list
router.get('/me/myrsvps',     rsvpsController.listUserRsvps);

module.exports = router;
