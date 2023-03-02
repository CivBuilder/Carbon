import express from 'express';

const router = express.Router();

router.get('/public', (req, res, next) => {
    res.status(200).json({ message : "public resource" });
});

router.get('/forumcontent', (req, res, next) => {
    res.status(200).json({ message : "youre good" });
});

export default router;