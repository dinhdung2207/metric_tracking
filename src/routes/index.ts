import express from "express";
import metricRoutes from "./metric.route";

const router = express.Router();

router
  .route("/health-check")
  .get((req, res) => res.status(200).send({ health: "ok" }));

router.use(metricRoutes);

export default router;