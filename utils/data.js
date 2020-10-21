const axios = require('axios');

const fetchCookie = async () => {
    let url = `https://api.nasdaq.com/api/quote/watchlist?symbol=aapl%7cstocks&symbol=msft%7cstocks`;
    let options = {
      headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
        'origin': 'https://www.nasdaq.com',
        'referer': 'https://www.nasdaq.com/',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'
      }
    };

    let data = await axios(url, options);

    return data;
};

const fetchData = async (sector, cookie) => {
    let url = `https://www.nasdaq.com/api/v1/screener?sector=${sector}&page=1&pageSize=20`;
    let options = {
      headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
        'cookie': cookie,
        'referer': 'https://www.nasdaq.com/market-activity/stocks/screener',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'
      }
    };

    let data = await axios(url, options);

    return data;
};

const fetchPrices = async (url) => {

  let options = {
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9',
      'origin': 'https://www.nasdaq.com',
      'referer': 'https://www.nasdaq.com/',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'
    }
  };

  let data = await axios(url, options);

  return data;
};

const fetchTrades = async (ticker, cookie) => {
  let url = `https://api.nasdaq.com/api/quote/${ticker}/realtime-trades?&limit=5`;
  let options = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    'cookie': cookie,
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'
  };

  let data = await axios(url, options);

  return data;
};

const abbreviate = function abbreviateNumber(value) {
  var newValue = value;

  if (value >= 1000) {
      var suffixes = ["", "K", "M", "B","T"];
      var suffixNum = Math.floor( (""+value).length/3 );
      var shortValue = '';
      for (var precision = 2; precision >= 1; precision--) {
          shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
          var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
          if (dotLessShortValue.length <= 2) { break; }
      }
      if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
      newValue = shortValue+suffixes[suffixNum];
  }

  return newValue;
};

module.exports = {
    fetchCookie,
    fetchData,
    fetchPrices,
    fetchTrades,
    abbreviate
};
