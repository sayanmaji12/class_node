const express = require('express');
const common = require('../services/commonService')
const router = express.Router();

const user = require('../controller/user_controller')

router.use('/', user );
router.post('/upload',async (req,res)=>{
    try{
        const result = await common.uploadFile(req);
        res.send(result)
    }catch(e){
        console.log(e);
        res.send({'success':false,"massage":"File not uploaded"})
    }
})
module.exports = router;