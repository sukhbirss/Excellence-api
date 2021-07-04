const express = require('express');
const cors = require('cors');
const app =express();
const User = require('./models/userModel');
const Test = require('./models/testModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
  })
  .then(() => console.log('DB connection successful!'));
mongoose.connection.on('error',(err)=>{
	console.log("err in mongodb connection",err)
})

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

app.use(express.json({limit: '10kb'}));
app.use(cors())

app.use((req,res,next) => {
	console.log("hello from the middleware............................");
	next()
});


app.post("/api/user", async(req, res) => {
	try{
		console.log(req.body)
		const newUser = await User.create({
		    name: req.body.name,
		    email: req.body.email
		  });
		res.status(200).json({
			newUser
		})
	}
	catch(err){
		res.status(400).json({
			status: err.status,
	        error: err,
	        message: err.message,
	        stack: err.stack
		})
	}
});

app.post("/api/test", async(req, res) => {
	try{

	console.log(req.body)
	const newTest = await Test.create({
	    first_round: req.body.first_round,
	    second_round: req.body.second_round,
	    thired_round: req.body.thired_round,
	    score:parseInt(req.body.first_round) + parseInt(req.body.second_round) + parseInt(req.body.thired_round),
	    student:req.body.id
	  });
	res.status(200).json({
		newTest
	})
		}
	catch(err){
		res.status(400).json({
			status: err.status,
	        error: err,
	        message: err.message,
	        stack: err.stack
		})
	}
});

app.get("/api/getscore", async(req, res) => {

	const result = await Test.aggregate( [
     {
       $group:
         {
           _id: "_id",
           scoreMax: { $max: "$score"},
           avgFirstRound: { $avg: "$first_round" },
           avgSecondRound: { $avg: "$second_round" },
           avgThiredRound: { $avg: "$thired_round" }
         }
     }
   ]);

	const maxScoringCandidate = await Test.find().sort({score:-1}).limit(1).populate({path:'student',select:'name email'})
	// const newtest = result.map((el) => ({
	// 	...el,score:el.first_round + el.second_round + el.thired_round
	
	// }))

	res.status(200).json({
		maxScoringCandidate,
		averages:result
	})
});

app.get("/", async(req, res) => {

	
	res.status(200).json({
		details:"this domain is to test this api",

		signup:{
			details:"signup url and formate is given below",
			url:"https://sukhbirapi.herokuapp.com/api/user",
			example:{
				name:"sukhbir",
				email:"sukhbir@gmail.com"
			}
		},

		test:{
			details:"this is to save score of user in all the rounds to database",
			url:"https://sukhbirapi.herokuapp.com/api/test",
			example:{
				first_round:"7",
				second_round:"8",
				thired_round:"7"
			}
		},

		getScore:{
			details:"this is to get the maximun scorinf candidate and average of all rounds",
			url:"https://sukhbirapi.herokuapp.com/api/getscore",
		}
	})
});
