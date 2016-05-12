import mongoose from 'mongoose';

const SpreadSchema = new mongoose.Schema({
  orgCode: String,
  taskOrder: String,
  taskOrderName: String,
  taskOrderTechMonitor: String,
  nasaContactName: String,
  nasaContactNumber: String,
  personnelName: {
    first: String,
    last: String
  },
  positionTitlePLC: String,
  dateOfHire: Date,
  completionDateITS: Date,
  completionDateLARC: Date,
  ociMitigation: Date,
  headCount: Number
});

export default mongoose.model('Spread', SpreadSchema);
