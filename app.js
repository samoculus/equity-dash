const path = require('path');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet({
    contentSecurityPolicy:({ 
    directives:{
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://maxcdn.bootstrapcdn.com/', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        frameSrc: ["'self'"],
        imgSrc: ["'self'"],
        fontSrc: ["'self'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      }
    }),
}));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/', require('./routes/web'));
app.use('/api', require('./routes/api'));

app.use(express.static('public'));

app.listen(app.get('port'), () => {
    console.log('Server started on port ' + app.get('port'));
});