import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  OrgCode: String,
  TO_Number: String,
  TO_Name: String,
  TO_TechnicalMonitor: String,
  NASAContactName: String,
  NASAContactPhone: String,
  PersonnelName: String,
  PositionTitlePLC: String,
  DoH: Date,
  ITS_016_001: Date,
  LARC_CICT: Date,
  OCIMPR: Date
});

export default mongoose.model('Report', ReportSchema);
