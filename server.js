const express = require('express');
const app = express();
const fs = require('fs')
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

app.post('/chats', function(req, res){
    if(req.body.msg != undefined){
        var msg = req.body.msg
        var index = msg.indexOf('=')
        if(msg.indexOf('=')!=-1){
            let key = msg.substring(0, index)
            let value = msg.substring(index+1, msg.length)
            let contenu = {
                demain: value
            }
            fs.readFile("./reponses.json", (err, data) => {
                if(data.length==0){
                    fs.writeFile("./reponses.json",JSON.stringify(contenu), error => {
                    if(error){
                        console.error(error);
                    }
                    res.send("Merci pour cette information.")
                    })
                } else {
                    if (err) throw err;
                    let demain = JSON.parse(data);
                    if(demain.demain!=undefined){
                        res.send("demain: " + demain.demain)
                    }
                }
            });
        } else {
            res.send('Je ne connais pas ' + msg + '.')
        }
    }
});  