import { Request, Response, NextFunction } from "express";
import { Metric, Type, Unit } from "../models";

export class MetricConrtoller {
  public initTypeAndUnit = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const disType = new Type({
        name: "distance",
        units: [],
      });

      await disType.save();

      const temType = new Type({
        name: "temperature",
        units: [],
      });

      await temType.save();

      const distanceUnit = ["meter", "centimeter", "inch", "feet", "yard"];
      const temperatureUnit = ["°C", "°F", "°K"];

      for (let index = 0; index < distanceUnit.length; index++) {
        const disUnit = new Unit({
          name: distanceUnit[index],
          typeId: disType._id,
        });
        await disUnit.save();

        disType.units.push(disUnit._id);
        await disType.save();
      }

      for (let index = 0; index < temperatureUnit.length; index++) {
        const temUnit = new Unit({
          name: temperatureUnit[index],
          typeId: temType._id,
        });
        await temUnit.save();

        temType.units.push(temUnit._id);
        await temType.save();
      }

      return res.json("success");
    } catch (error) {
      return next(error);
    }
  };

  public createMetric = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { value, unitName, typeName } = req.body;
      const currType = await Type.findOne({ name: typeName });

      if (!currType) {
        throw new Error("Type is not defined");
      }

      const currUnit = await Unit.findOne({ name: unitName });
      const isTypeIncludeUnit = currType.units.includes(currUnit?._id.toString());

      if (!currUnit || !isTypeIncludeUnit ) {
        throw new Error("Unit is not defined");
      }

      const newMetric = new Metric({
        value,
        unitId: currUnit._id,
        typeId: currType._id,
      });

      await newMetric.save();

      return res.status(200).json(newMetric);
    } catch (error) {
      return next(error);
    }
  };

  public getMetricsByType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { type, startDate, endDate, unitName } = req.query;
      let options: any = {};

      if (startDate && endDate) {
        if (startDate === "" || endDate === "") {
          return res.status(400).json({
            status: "failure",
            message: "Please ensure you pick two dates",
          });
        }

        options.createdAt = {
          $gte: new Date(
            new Date(String(startDate)).setHours(0, 0, 0)
          ).toISOString(),
          $lt: new Date(
            new Date(String(endDate)).setHours(23, 59, 59)
          ).toISOString(),
        };
      }

      if (type) {
        const currType = await Type.findOne({ name: type })

        options.typeId = currType?._id.toString();
      }

      if (unitName) {
        const currUnit = await Unit.findOne({ name: unitName })

        options.unitId = currUnit?._id.toString();
      }

      const metricsList = await Metric.find(options)
        .populate({
          path: "typeId",
          select: "name",
        })
        .populate({
          path: "unitId",
          select: "name",
        })

      return res.status(200).send({
        count: metricsList.length,
        data: metricsList,
      });
    } catch (error) {
      return next(error);
    }
  };
}
