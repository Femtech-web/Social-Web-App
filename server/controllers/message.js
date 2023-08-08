const Message = require('../models/message');

const getMessage = async (req, res) => {
    const allMessage = await Message.find();

    res.status(200).json(allMessage);
}

module.exports = { getMessage };