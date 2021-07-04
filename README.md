live API link https://sukhbirapi.herokuapp.com/

instruction to run locally 1 clone this repo using git clone command 2 install all dependencies using npm install command 3 use node index.js to start this in localhost

{
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
					"id": id of student who's test is this
				}
			},

			getScore:{
				details:"this is to get the maximun scoring candidate and average of all rounds",
				url:"https://sukhbirapi.herokuapp.com/api/getscore",
			}
}
