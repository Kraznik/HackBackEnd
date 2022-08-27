var ETHMoment = require("../models").ETHMoment


var db  = require('../models')
const { Op } = require("sequelize");

module.exports = async function(req,res)
{

    var leaderboard = await ETHMoment.findAll({order: [['count', 'DESC'],['updatedAt', 'ASC']]})

    var data = {
        data: leaderboard
    }

    res.send(leaderboard);

}