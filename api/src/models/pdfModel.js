import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const PDF = mongoose.model('PDF', pdfSchema);

export default PDF;
