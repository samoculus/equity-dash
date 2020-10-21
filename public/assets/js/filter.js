let techBtn = document.getElementsByClassName('main-button')[0];

techBtn.active = true;

// Active
const filterCont = document.getElementById('filter-container');
const buttons = filterCont.getElementsByClassName('main-button');

for ( let x = 0; x < buttons.length; x++ ) {
    buttons[x].addEventListener('click', () => {
        loading(true, x);
        fetch('/api/fetch-sector', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                sector: buttons[x].id
            })
        }).then( (response) => {
            return response.json();
        }).then(( parsedResponse) => {
            let button = document.getElementById(`spinner${x}`);
            let buttonText = document.getElementById(`button-text${x}`);
            if(parsedResponse.error != undefined){
                console.log(parsedResponse);
                const error = parsedResponse.error;
                button.classList.add("hidden");
                buttonText.classList.remove("hidden");
                const fetcherror = document.getElementById('errors');
                fetcherror.textContent = 'Error. Please try again in a few moments.';
              } else {
                filterData(parsedResponse.data, parsedResponse.prices);
                loading(false, x);
                let current = document.getElementsByClassName('active');
                current[0].className = current[0].className.replace(" active", "");
                document.getElementById(`${buttons[x].id}`).className += " active";
                getButtons();
              }
        }).catch( (err) => {
            console.error('Error:', err);
            displayError(err);
        })
    });
};

// Functions
let filterData = (data, prices) => {
    let tableBody = document.getElementById('table-body');

    tableBody.innerHTML = '';
    for ( let y = 0; y < data.length; y++ ) {
        if ( prices[y].deltaIndicator == 'down' ) {
            priceColor = '#b6314b';
        } else { priceColor = '#208f20'; };

        if ( data[y].hedgeFund == 'Positive') {
            dataColor = '#208f20';
        } else if ( data[y].hedgeFund == 'Negative' ) {
            dataColor = '#b6314b';
        } else { dataColor = '#b6ad31' };

        tableBody.innerHTML += `<tr class="table-row">
        <td data-label="Ticker"> ${data[y].ticker}</td>
        <td data-label="Price" style="color: ${priceColor};" class="price">${prices[y].price}</td>
        <td data-label='% Change' class="change"><b style="color: ${priceColor};"><b>${prices[y].deltaIndicator}</b> ${prices[y].percentChange}</td>
        <td data-label='Market Cap'>$ ${data[y].marketCap}</td>
        <td data-label='Analyst Consensus'>${data[y].analystConsensus}</td>
        <td data-label='Hedge Fund Sentiment' style="color: ${dataColor};">${data[y].hedgeFund}</td>
        <td data-label='Retail Sentiment'>${data[y].retail}</td>
        <td data-label='Last 5 Trades' class="modal-button" id="${data[y].ticker}">
        <button>View</button>
        </td>
        <div id="modal" class="modal">
        <div class="modal-content">
        <h4 class="title">Trades</h4>
        <hr/>
        <div class="modal-div"> 
        </div>
        <span><button class="close-modal" style="margin-bottom: 25px;"><b>Exit</b></button></span>
        </div>
        </div>
        </tr>`;
    };
};

let loading = (isLoading, id) => {
    let button = document.getElementById(`spinner${id}`);
    let buttonText = document.getElementById(`button-text${id}`);
    if (isLoading) {
      // Disable the button and show a spinner
      button.classList.remove("hidden");
      buttonText.classList.add("hidden");
    } else {
      button.classList.add("hidden");
      buttonText.classList.remove("hidden");
    }
};

function displayError(error) {
    const errorElem = document.getElementById('errors');
    errorElem.textContent = error ? error.message : '';
};

// Trades Functions

let trades = (modalButtons, modals, closeModals) => { 
    
    for ( let s = 0; s < modalButtons.length; s++ ) {
            
    modalButtons[s].addEventListener('click', () => {
        let modal = modals[s];
        let closeModal = closeModals[s];
    
        fetch('/api/fetch-trades', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ticker: modalButtons[s].id
            })
        }).then( (response) => {
            return response.json()
        }).then( (parsedResponse) => {
            if (parsedResponse.error != undefined) {
                const fetcherror = document.getElementById('errors');
                fetcherror.testContent = 'Error. Please try again in a few moments.';
            } else { 
                postTrades(parsedResponse.trades, s); 
                modal.style.display = 'block';
            }
        }).catch( (err) => {
            console.error('Error:', err);
            displayError(err);
        })
    
        // Close Modal
        closeModal.addEventListener('click', () => {
          modal.style.display = 'none';
        }); 
    });   
  };
};

let getButtons = () => {
    let s = document.getElementsByClassName('modal-button');
    let m = document.getElementsByClassName('modal');
    let d = document.getElementsByClassName('close-modal');

    console.log('here');

    trades(s, m, d);
};


let modalButtons = document.getElementsByClassName('modal-button');
let modal = document.getElementsByClassName('modal');
let closeModal = document.getElementsByClassName('close-modal');

trades(modalButtons, modal, closeModal);

// Functions
let postTrades = (trades, target) => {
    let modalContent = document.getElementsByClassName('modal-div')[target];
    modalContent.innerHTML = '';
    for ( let x = 0; x < trades.length; x++ ) {
        modalContent.innerHTML += `
        <br>
        <b>${trades[x].time}</b> | <b style="color: #F8B195 ">${trades[x].size} @ ${trades[x].price} <b>
        <hr/>
        <br>
        `
    };
};