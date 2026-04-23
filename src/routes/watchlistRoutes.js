import express from "express";
import { addToWatchlist, removeFromWatchlist, updateWatchlistItem } from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validaterequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authMiddleware);

router.post('/', validaterequest(addToWatchlistSchema), addToWatchlist);

router.delete('/:id', removeFromWatchlist);

router.put('/:id', updateWatchlistItem);

export default router;