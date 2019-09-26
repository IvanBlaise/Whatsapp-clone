const firebase = require('firebase');
require('firebase/firestore');

export class Firebase{

    constructor(){

        this._config =  {
            apiKey: "AIzaSyAn03Nl6O0iG6mIfMGWIW02XeNT47FecNM",
            authDomain: "whatsapp-clone-a560b.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-a560b.firebaseio.com",
            projectId: "whatsapp-clone-a560b",
            storageBucket: "",
            messagingSenderId: "981306505517",
            appId: "1:981306505517:web:6761786398743d6bd9fba4"
        };

        this.init();
    }

    init(){

        if(!window._initializedFirebase){
        
            firebase.initializeApp(this._config);

            //nessa versão do firebase não precisa definir como true, já vem pro default
            // firebase.firestore().settings({
            //     timestampsInSnapshots: true
            // });

            window._initializedFirebase = true;
        }
    }

    static db(){

        return firebase.firestore();
    }

    static hd(){

        return firebase.storage();
    }

    initAuth(){

        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result=>{

                let token = result.credential.accessToken;
                let user = result.user;
                s({
                    user, 
                    token
                });
            })
            .catch(err=>{
                f(err);
            });
        });
    }

}