const router = require('express').Router();
const {
    getThoughts,
    getSingleThoughts,
    createThoughts,
} = require('../../controllers/thoughtsControllers');

router.route('/').get(getThoughts).post(postThoughts);

