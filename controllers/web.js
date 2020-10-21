const { getData } = require('../services/services');

const postData = async (req, res) => {

    try {
        let sector = 'Technology';
        let status = await getData(sector);

        return res.render('index', { data: status.data, prices: status.prices });

    } catch(err) {
        console.log(err);
        return res.render('index');  
    }
};

module.exports = {
    postData
};