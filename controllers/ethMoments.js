var ETHMoment = require("../models").ETHMoment
var User = require("../models").User

var db  = require('../models')

module.exports = async function(req,res)
{

    let {addresses, creatorAddress} = req.body;

    if(!addresses || !creatorAddress)
    {
        res.status(400).send({error: "Invalid Payload"})
    }

    if(addresses.length)
    {
        for(i=0; i<addresses.length; i++)
        {

            var checkWallet = await ETHMoment.findAll({where:{address: addresses[i]}});

            if(checkWallet.length)
            {

                var tempCount = checkWallet[0].count;
                var tempCreations = checkWallet[0].creations;
                var tempTagged = checkWallet[0].tagged;

                if(addresses[i] == creatorAddress)
                {
                    var updateWallet = await ETHMoment.update({
                        count: tempCount+1,
                        creations: tempCreations+1,
                        tagged: tempTagged
                    },{where:{address: addresses[i]}})
                }else{
                    var updateWallet = await ETHMoment.update({
                        count: tempCount+1,
                        creations: tempCreations,
                        tagged: tempTagged+1
                    },{where:{address: addresses[i]}})
                }

            }else{

                if(addresses[i] == creatorAddress)
                {
                    var uploadWallet = await ETHMoment.create({
                        address: addresses[i],
                        count: 1,
                        creations: 1,
                        tagged: 0
                    })
                }else{
                    var uploadWallet = await ETHMoment.create({
                        address: addresses[i],
                        count: 1,
                        creations: 0,
                        tagged: 1
                    })
                }

                
            }
    
        }

        

        var indexOfCreator = addresses.indexOf(creatorAddress);

        if (indexOfCreator > -1) {
            addresses.splice(indexOfCreator, 1);
        }

        var checkUser = await User.findAll({where:{
            creator: creatorAddress
        }});

        if(checkUser.length)
        {

            var tempAddresses = checkUser[0].addresses;
            var finalArray = tempAddresses.concat(addresses.filter((item) => tempAddresses.indexOf(item) < 0));
            
            var update = await User.update({
                addresses: finalArray
            },{where: {creator: creatorAddress}});



        }else{
            var upload = await User.create({
                creator: creatorAddress,
                addresses
            })
        };

        res.send({message: "Success"});
        return;


    }else{
        res.status(400).send({error: "No data"})
    }

    

}