import { Router } from 'express';

const router = Router();

// Define your routes here
router.get('/', (req, res) => {
    res.json({ message: 'Hello from /data endpoint!' });
});

// Export the router
export default router;
