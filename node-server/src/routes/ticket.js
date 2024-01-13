import { Router } from "express";

const router = Router();

router.post('/', async (req, res) => {
  try {
    await createAutotaskTicket(req.data);
  } catch (error) {
    res.status(500).send({ status: 'error', error });
    return;
  }
  res.send({ status: 'success' });
});

export default router;