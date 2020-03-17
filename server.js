const express = require('express');
const app = express();
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
app.use(express.json());
const PORT = process.env.PORT || 3000;
const url = 'mongodb://localhost:27017/chat-bot';
const client = new MongoClient(url, { useUnifiedTopology: true });
const dbName = 'chat-bot';

(async function() {
    try {
      // Use connect method to connect to the Server
      await client.connect();
      console.log('Connected to ' + dbName)

    } catch (err) {
      console.log(err.stack);
    }
  
  })();

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

/*app.post('/chat', function(req, res){
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
});*/

app.post('/chat', function(req, res){

    const db = client.db(dbName)
    const col = db.collection('messages')

    switch(req.body.msg){
        case 'ville':
            col.insertOne({from:"user", msg:"ville"})
            col.insertOne({from:"chat-bot", msg:"Nous sommes à Paris."})
            return res.send('Nous sommes à Paris.\n')
            break
        case 'meteo':
            col.insertOne({from:"user", msg:"meteo"})
            col.insertOne({from:"chat-bot", msg:"Il fait beau."})
            return res.send('Il fait beau.\n')
            break
        default:
            break
    }

    if(req.body.msg != undefined){
        var msg = req.body.msg
        var index = msg.indexOf('=')
        if(msg.indexOf('=') == -1){
            fs.readFile("./reponses.json", (err, data) => {
                if(data == undefined){
                    col.insertOne({from:"user", msg:msg})
                    col.insertOne({from:"chat-bot", msg:"Je ne connais pas " + msg + "."})
                    res.send("Je ne connais pas " + msg + ".");
                } else {
                    if (err) throw err;
                        let demain = JSON.parse(data);
                        if(demain.demain !== undefined){
                            col.insertOne({from:"user", msg:"demain"})
                            col.insertOne({from:"chat-bot", msg:"demain: " + demain.demain})
                            res.send("demain: " + demain.demain)
                        }
                }
            });
        } else {
            let key = msg.substring(0, index)
            let value = msg.substring(index+1, msg.length)
            let content = {
                demain: value
            }
            fs.writeFile("./reponses.json",JSON.stringify(content), error => {
                if(error){
                    console.error(error);
                }
                col.insertOne({from:"user", msg:"demain: " + value})
                col.insertOne({from:"chat-bot", msg:"Merci pour cette information."})
                res.send("Merci pour cette information.")
            })
        }
    }
});

app.get('/messages/all', function (req, res) {

    const db = client.db(dbName)
    const col = db.collection('messages')

    col.find().toArray(function(err, docs) {
        return res.json(docs);
    });
})

app.delete('/messages/last', function (req, res) {

    const db = client.db(dbName)
    const col = db.collection('messages')

    col.findOneAndDelete({},{"sort": { "_id": -1 }},(err, data) => {
        col.findOneAndDelete({},{"sort": { "_id": -1 }},(err, data) => {
            res.send("Deleted")
        });
    });
});