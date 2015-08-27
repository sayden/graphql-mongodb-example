import mongoose from 'mongoose';

var HobbySchema = new mongoose.Schema({
  id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  title: String,
  description: String,
  type: String
});

let Hobby = mongoose.model('Hobby', HobbySchema);

module.exports = Hobby;

module.exports.getHobbyByPosition = (root, {id}) => {
  return new Promise((resolve, reject) => {
    Hobby.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res[id]);
    });
  });
};

module.exports.getListOfHobbies = () => {
  return new Promise((resolve, reject) => {
    Hobby.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};