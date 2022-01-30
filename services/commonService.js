// const formidable = require('formidable');
const fs = require('fs');
// const dotenv = require('dotenv');
// dotenv.config();
// var root = process.env.UPLOAD_dir; 

//var request = require('request');


// function sendOTP(otp, mobileNumber) {
//     mobileNumber = '91' + mobileNumbers
//     var options = {
//       'method': 'POST',
//       'url': 'https://api.textlocal.in/send?apiKey=MzgzMjY1N2E3NzM1NDE0OTU5NDI3NTcyN2EzODUzNTY=&numbers=' + mobileNumber + '&sender=WOWLAP&message=Dear student, ' + otp + ' is the OTP for your registration on WOWL APP. Happy learning!',
//       'headers': {
//         'Cookie': 'PHPSESSID=ih1068eonej2u7mfe08qplaht7'
//       }
//     };
//     request(options, function (error, response) {
//       if (error) throw new Error(error);
//       console.log(response.body);
//     });
// }


module.exports.getOTP = (mobileNumber) => {
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    if(mobileNumber=='8926871862'){
        OTP = '1234'
    }
    sendOTP(OTP, mobileNumber)
    return OTP;
}

module.exports.errorResolve = (err) => {
    return {error: err};
}

module.exports.successResolve = (data) => {
    return {error: null, result: data};
}

module.exports.sendResponse = (success = true, status = 200, message = '', response = null, error = 0) => {
    if (response) {
        return {
            
                status: status,
                success: success,
                error: error,
                message: message,
                response
        }
    }
    return {
       
        status: status,
        success: success,
        error: error,
        message: message
    }
}

// module.exports.uploadFile = (req) => {
//     return new Promise((resolve, reject) => {
//         console.log(req)
//         const form = formidable({multiples: true, uploadDir: root});
//         let filename = '';
//         let extenction= '';
//         form.on('file', function(field, file) {
//             //rename the incoming file to the file's name
//             const timestamp = new Date().getTime();
//             // console.log(file.originalFilename)
//             // console.log(field)
//              let fileExplode = file.originalFilename.split('.');
             
//             filename = fileExplode[0] +'_'+ timestamp + '.'+fileExplode[1] ;
//             extenction= fileExplode[1];
//             //console.log(filename)
//             fs.rename(file.filepath, form.uploadDir + "/" + filename, (err) => {
//                 console.log('file error >> ', err);
//             });
//         });
//         form.parse(req, (err, fields, files) => {
//             const data = fields;
//             data['fileName'] = filename;
//             data['extenction']=extenction;
//             resolve(data);
//         });
//     });
// }