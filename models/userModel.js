const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: {
  	type:String,
  	required:[true,"please provide Name "]
	},
  email:{
  	type:String,
  	required:[true,"please provide Email"],
  	unique:true,
  }
});

module.exports = model('User', userSchema);
