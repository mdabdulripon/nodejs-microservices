import express from "express";
const router = express.Router();

router.post('/api/users/signOut', (req, res) => {
    res.send('Sign Out!!')
});

export { router as signOutRouter };
