var ETHMoment = require("../models").ETHMoment
module.exports = async function(req,res)
{

    let {address} = req.params;

    var find = await ETHMoment.findAll({where: {address: address}});

    if(find.length)
    {
        res.send({data: find[0]})
    }else{
        res.send({error: "Not Found"})
    }
    
}
