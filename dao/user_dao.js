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