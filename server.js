const express = require('express');
const app = express();
app.use(express.urlencoded());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/hello', function(req, res){
    var nom = req.query.nom;
    if(nom=="" || nom==undefined){
        res.send('Quel est votre nom ?\n')
    } else {
        res.send('Hello ' + nom + '!\n')
    }
})

// Access the parse results as request.body
app.post('/chat', function(req, res){
    if(req.body.msg != undefined){
        switch(req.body.msg){
            case 'ville':
                res.send('Nous sommes à Paris.\n')
                break
            case 'meteo':
                res.send('Il fait beau.\n')
                break
            default:
                break
        }
    }
    console.log(req.body.msg);
});