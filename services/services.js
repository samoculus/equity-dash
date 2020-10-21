const { fetchCookie, fetchData, fetchPrices, fetchTrades, abbreviate } = require('../utils/data');

const getData = async (sector) => {
    let data = [];
    let prices = [];
    let url = 'https://api.nasdaq.com/api/quote/watchlist?';

    let cookie = await fetchCookie().then( (res) => {
        return res.headers['set-cookie'][1].split(' ')[0];
    }).catch((err) => {
        console.log(err);
        return { status: 'Error'};
    });

    await fetchData(sector, cookie).then( (res) => {
        for( ticker of res.data.data ) {
            url = url + `symbol=${ticker.ticker}%7cstocks&`;
            let market_cap = abbreviate(ticker.marketCap.toString());
            try {
                data.push({
                    ticker: ticker.ticker,
                    marketCap: market_cap,
                    analystConsensus: ticker.analystConsensusLabel,
                    hedgeFund: ticker.hedgeFundSentimentData.signal,
                    retail: ticker.investorSentimentData.label
                });
            } catch {
                data.push({
                    ticker: ticker.ticker,
                    marketCap: market_cap,
                    analystConsensus: ticker.analystConsensusLabel,
                    hedgeFund: 'No Data',
                    retail: 'No Data'
                });
            };
        };
    });

    await fetchPrices(url).then( (res) => {
        for( ticker of res.data.data ) {
            prices.push({
                price: ticker.lastSalePrice,
                percentChange: ticker.percentageChange,
                deltaIndicator: ticker.deltaIndicator
            });
        };
    });

    return { status: 'Success', data: data, prices: prices};
};

const getTrades = async (ticker) => {
    let trades = [];

    let cookie = await fetchCookie().then( (res) => {
        return res.headers['set-cookie'][1].split(' ')[0];
    }).catch((err) => {
        console.log(err);
        return { status: 'Error'};
    });

    await fetchTrades(ticker, cookie).then( (res) => {
        for (trade of res.data.data.rows ) {
            trades.push({
                time: trade.nlsTime,
                price: trade.nlsPrice,
                size: trade.nlsShareVolume
            })
        };
    });

    return { status: 'Success', trades: trades };
};

module.exports = {
    getData,
    getTrades
};