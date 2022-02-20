const db = require('../database/dbConn');
const common = require('../services/commonService');

module.exports.login = (data) => {
	return new Promise((resolve, reject) => {
		try {
            console.log(data)
			var sql 	=	"SELECT id as userId,username,email,userType  FROM `user` WHERE `username`='"+data.username+"' AND password = '"+data.password+"' AND deleted =0";
			db.connection.query(sql,function (err, success){
                if (err) {
                    resolve(common.errorResolve(err))
                } else {
                    console.log(success)
                    resolve(success)
                }
            });
		} catch (e) {
			console.log(e);
			resolve('500');
		}
	});
}
module.exports.addUser = (data) => {
	return new Promise((resolve, reject) => {
		try {
            console.log(data)
			var sql 	=	"INSERT INTO `user`(`username`, `email`, `password`, `userType`) VALUES ('"+data.username+"','"+data.email+"','"+data.password+"','"+data.userType+"')";
			db.connection.query(sql,function (err, success){
                if (err) {
                    resolve(common.errorResolve(err))
                } else {
					for(let role of data.roles){
						var sql1 	=	"INSERT INTO `user_role_map`( `user_id`, `role_id`) VALUES ("+success.insertId+","+role.role_id+")";
						db.connection.query(sql1,function (err1, success1){
							if (err) {
								console.log(err)
								resolve(common.errorResolve(err))
							}
						});
					}

                    console.log(success)
                    resolve(success)
                }
            });
		} catch (e) {
			console.log(e);
			resolve('500');
		}
	});
}
module.exports.allUsers  = (data) => {
	return new Promise((resolve, reject) => {
		try {
            console.log(data)
			var sql 	=	"select *,id as userId from user where userType ='user' AND deleted=0";
			db.connection.query(sql,async function (err, success){
                if (err) {
                    resolve(common.errorResolve(err))
                } else {
                    let i=0;
					for(let user of success){
						user.roles= await getRole(user.userId);
						// var sql1 	=	"select role_id from user_role_map where user_id="+user.userId+"";
						// db.connection.query(sql1,function (err1, success1){
						// 	if (!err1) {
						// 		user.roles= success1;
						// 		console.log(user)
						// 		if (i == (success.length - 1)) {
									
						// 			resolve(success)
						// 		}
						// 	}
						// });
						// i++;
					}
					//console.log(success)
                    resolve(success)
                }
            });
		} catch (e) {
			console.log(e);
			resolve('500');
		}
	});
}
function getRole(userId){
	return new Promise((resolve, reject) => {
		try {
			var sql1 	=	"select role_id from user_role_map where user_id="+userId+"";
			db.connection.query(sql1,function (err1, success1){
				if(!err1){
					resolve(success1)
				}
				
			});
		}catch(e){
			console.log(e);
			resolve('500');
		}
	});
}