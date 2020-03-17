Le serveur écoute sur le port 3000. Vous pouvez changer le port en modifiant la constante PORT.

Pour récupérer le projet git :
    $ git clone https://github.com/HenriGourgue/NodeJS
    $ cd NodeJS
    $ npm install #installation des dépendances
    $ npm start #exécution du serveur
    # ctrl-c pour quitter le serveur

Différentes routes accessibles :
    -/messages/all (http method : get) : permet de lire tous les messages échangés entre les utilisateurs et le chat-bot.
    -/messages/last (http method : delete) : permet de supprimer la dernière conversation entre le chat-bot et un utilisateur (deux derniers messages).
    -/chat (http method : post) :   -Quand le parametre est "ville" : renvoie au client "Nous sommes à Paris." et historise la conversation.
                                    -Quand le parametre est "meteo" : renvoie au client "Il fait beau." et historise la conversation.
                                    -Quand le parametre est "demain=xxxxx" : renvoie au client "Merci pour cette information.", sauvegarde le nouveau jour associé à demain et historise la conversation.
                                    -Quand le parametre est "demain" : si demain n'est pas encore renseigné, renvoie au client "Je ne connais pas demain." et historise la conversation.
                                    -Quand le parametre est "demain" : si demain est renseigné, renvoie au client "demain: xxx", xxx correspondant à l'enregistrement de demain et historise la conversation.