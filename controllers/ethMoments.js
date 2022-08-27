var ETHMoment = require("../models").ETHMoment

var db  = require('../models')

module.exports = async function(req,res)
{

    var arr = req.body.data;

    if(arr.length)
    {   

        var sql = "UPDATE ETHMoments set count =count+1,updatedAt = CURRENT_TIMESTAMP where ticketId in (";

        for(i=0; i<arr.length; i++)
        {
            if(i<arr.length-1)
            {
                sql = sql+arr[i]+","
            }else{
                sql = sql+arr[i]+")"
            }
        }

        var update = await db.sequelize.query(sql);
        
        res.send({message: "Success"})

    }else{
        res.send({error: "Incorrect Payload"})
    }

}