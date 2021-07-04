const { model, Schema  } = require('mongoose');

const testSchema = new Schema({
  first_round: {
  	type:Number,
  	required:[true,'please provide first_round marks'],
  	min:0,
  	max:10,
  },

  second_round: {
  	type:Number,
  	required:[true,'please provide second_round marks'],
  	min:0,
  	max:10,
  },

  thired_round: {
  	type:Number,
  	required:[true,'please provide thired_round marks'],
  	min:0,
  	max:10,
  },

  student:{
      type:Schema.ObjectId,
      ref:"User",
      unique:true,
   },
  score:Number
});

module.exports = model('Test', testSchema);
