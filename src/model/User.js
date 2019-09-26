import {Firebase} from '../util/Firebase'
import { Model } from './Model';



export class User extends Model{

    constructor(id){

        super();

        

        if(id) this.getById(id);

    }

    getById(id){

        return new Promise((s,f)=>{

            User.findByEmail(id).onSnapshot(doc=>{

                this.fromJSON(doc.data());

                s(doc);

            });
        });

    }

    static findByEmail(email){

        return User.getRef().doc(email);
    }

    static getRef(){

        return Firebase.db().collection('/users');

    }

    static getContactRef(id){

        return  User.getRef()
                    .doc(id)
                    .collection('contacts');

    }

    get name(){ return this._data.name;}
    set name(value){this._data.name = value;}

    get email(){return this._data.email;}
    set email(value){this._data.email = value;}

    get photo(){return this._data.photo;}
    set photo(value){this._data.photo = value;}

    save(){

        return User.findByEmail(this.email).set(this.toJOSN());

    }

    addContact(contact){

       return User.getContactRef(this.email)
                .doc(btoa(contact.email))
                .set(contact.toJOSN());

    }

    getContacts(){

        return new Promise((s, f)=>{

            User.getContactRef(this.email).onSnapshot(docs=>{

                let contacts = [];

                docs.forEach(doc=>{

                    let data = doc.data();

                    data.id = doc.id;

                    contacts.push(data);
                });

                this.trigger('contactschange', docs);

                s(contacts);

            });


        });

        
    }


}