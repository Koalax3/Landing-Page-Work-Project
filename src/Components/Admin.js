import React, { Component } from 'react';
import firebase from '../firebaseConfig';
import './Admin.css'
import {validateEmail} from '../utils';
var Email = window.smtp;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host: '',
            password: '',
            username: '',
            recipient: '',
            user: [],
        }
        firebase.auth().onAuthStateChanged(user => {
            firebase.database().ref('/email').once('value').then(snapshot => {
                let data = snapshot.val();
                let email = data.listEmail;
                let tmpuser =[];
                for (var key in email) {
                    if (email.hasOwnProperty(key)) {
                        tmpuser.push({
                            id:email[key].id,
                            SubscribeAt: email[key].SubscribeAt,
                            favori:email[key].favori,
                            name: email[key].name,
                            mail: email[key].mail,
                            firstname: email[key].firstname
                        });
                    }
                }
                this.setState(state => ({
                    user: tmpuser ,
                    host: data.host,
                    password: data.password,
                    username: data.username,
                    recipient: data.recipient
                }));
            });
        });
        this.deleteUser = this.deleteUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.downloadUser = this.downloadUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeMail = this.changeMail.bind(this);
        this.send = this.send.bind(this);
    }

    deleteUser(id){
        var tmp = this.state.user.filter(el=>el.id != id);
        this.setState(state => ({ user: tmp }));
    }

    saveUser() {
        if (window.confirm('êtes-vous sur de vouloir sauvegarder la liste sur la base de données')) {
            var updates = {};
            updates['email/listEmail'] = this.state.user;
            return firebase.database().ref().update(updates);
        }
    }

    send () {
        Email.send({
            Host: this.state.host,
            Username: this.state.username,
            Password: this.state.password,
            To: 'lucas.depret@epitech.eu',
            From: this.state.username,
            Subject: "Test",
            Body: "Ce message est un test pour le changement de destinataire"
        }).then(
            message => {message == "OK" ?alert('Test envoyé'):alert(message)});
    }

    downloadUser() {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state.user, 0, 4)));
        element.setAttribute('download', 'User_Loupgarous.fr-' + new Date().toLocaleString() + '.json');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    changeMail() {
        if (validateEmail(this.state.recipient)) {
            var updates = {};
            updates['email/recipient'] = this.state.recipient;
            return firebase.database().ref().update(updates);
        }
        else
            alert('Invalid mail');
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        const user = this.state.user.map(element =>
            <div key={element.id} className="List">
            <div className="menuother"></div>
            <div className="itemTitle">{element.name}</div>
            <div className="itemTitle">{element.firstname}</div>
            <div className="itemTitle">{element.mail}</div>
            <div className="itemTitle">{element.SubscribeAt}</div>
            <div className="itemTitle">{element.favori}</div>
            <div className="menuotherlast"><i className="fas fa-times" onClick={()=>this.deleteUser(element.id)}></i></div>
            </div>);

        return (
            <div id="admin">
                <div className="container-admin">
                    <div className="accordion" id="accordionExample">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h2 className="mb-0">
                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        <strong>Paramètre des mails</strong>
                                    </button>
                                </h2>
                            </div>

                            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card-body">
                                <h4>Changer l'adresse de réception</h4>
                                    <div className="input-group mb-2">
                                        <input type="text" className="form-control" placeholder="Adresse du destinataire" name="recipient" value={this.state.recipient} onChange={this.handleChange} aria-label="Recipient's username" aria-describedby="button-addon2" />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.changeMail}>Changer</button>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-info" onClick={this.send}>Test</button>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingTwo">
                                <h2 className="mb-0">
                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                        <strong>Liste des incrits</strong>
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                <div className="card-body">
                                    <div className="userContainer">
                                        <div className="containerMenu">
                                            <div className="menuother"></div>
                                            <div className="menuTitle">Nom</div>
                                            <div className="menuTitle">Prénom</div>
                                            <div className="menuTitle">Mail</div>
                                            <div className="menuTitle">inscrit le</div>
                                            <div className="menuTitle">Favoris</div>
                                            <div className="menuotherlast"></div>
                                        </div>
                                        <div className="containerList">
                                        {user}
                                        </div>
                                        <button type="button" className="btn btn-danger" onClick={this.saveUser}>Sauvegarder</button>
                                        <button type="button" className="btn btn-warning" onClick={this.downloadUser}>Download</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Admin;