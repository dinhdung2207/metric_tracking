import mongoose from 'mongoose';
import Metric from './metric.model';
import Unit from './unit.model';
import Type from './type.model';

async function connectDb(dbUrl: string): Promise<void> {
  await mongoose.connect(dbUrl);
}

export { connectDb, Metric, Unit, Type };
