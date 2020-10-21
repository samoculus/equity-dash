setInterval(() => {
    let current = document.getElementsByClassName('active')[0];
    fetch('/api/fetch-prices', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            sector: current.id
        })
    }).then( (response) => {
        return response.json();
    }).then( (parsedResponse) => {
        if (parsedResponse.error != undefined) {
            const fetcherror = document.getElementById('errors');
            fetcherror.textContent = 'Error. Please try again in a few moments.';
        } else { postPrices(parsedResponse.prices); }
    }).catch( (err) => {
        console.error('Error:', err);
        displayError(err);
    })
}, 5000)

//functions
let postPrices = (prices) => {
  for(let x = 0; x < prices.length; x++) {
      let price = document.getElementsByClassName('price')[x];
      let change = document.getElementsByClassName('change')[x];

      price.innerHTML = '';
      change.innerHTML = '';

      if ( prices[x].deltaIndicator == 'down' ) {
        priceColor = '#b6314b';
    } else { priceColor = '#208f20'; };

    price.innerHTML = `<td data-label="Price" style="color: ${priceColor};" class="price">${prices[x].price}</td>`;
    change.innerHTML = `<td data-label='% Change' class="change"><b style="color: ${priceColor};"><b>${prices[x].deltaIndicator}</b> ${prices[x].percentChange}</td>`;
  };
};

function displayError(error) {
    const errorElem = document.getElementById('errors');
    errorElem.textContent = error ? error.message : '';
};