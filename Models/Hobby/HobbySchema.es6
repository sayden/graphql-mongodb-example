import mongoose from 'mongoose';

var HobbySchema = new mongoose.Schema({
  id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  title: String,
  description: String,
  type: String
});

module.exports = mongoose.model('Hobby', HobbySchema);
