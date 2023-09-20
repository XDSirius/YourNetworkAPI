const router = require('express').Router();
const {
    getThoughts,
    updateThought,
    createThought,
    getSingleThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtsControllers');

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);
module.exports = router;
