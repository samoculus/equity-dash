const { getData, getTrades } = require('../services/services');

const updateSector = async (req, res) => {
    try {
        let sector = req.body.sector;
        let status = await getData(sector);

        return res.json( { data: status.data, prices: status.prices } );

    } catch(err) {
        console.log(err);
        return res.json({ error: err });  
    }
};

const postTrades = async (req, res) => {
    try {
        let ticker = req.body.ticker;
        let status = await getTrades(ticker);

        return res.json( { trades: status.trades } );
    } catch(err) {
        console.log(err);
        return res.json({ error: err });  
    }
}

module.exports = {
    updateSector,
    postTrades
};