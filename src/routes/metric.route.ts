import express from "express";
import { MetricConrtoller } from "../controllers/metric.controller";

const router = express.Router();
const metricController = new MetricConrtoller();

router.route("/initData").post(metricController.initTypeAndUnit);
router.route("/addMetric").post(metricController.createMetric);
router.route("/getMetrics").get(metricController.getMetricsByType);

export default router;