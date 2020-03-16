const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Hello World!')
  })

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/hello', function(req, res){
    var nom = req.query.nom;
    if(nom=="" || nom==undefined){
        res.send('Quel est votre nom ?\n')
    } else {
        res.send('Hello ' + nom + '!\n')
    }
})