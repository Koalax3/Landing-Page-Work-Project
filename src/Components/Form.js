import React, { Component } from 'react';
import './Form.css';
import tWriter from '../tWriter';
import firebase from '../firebaseConfig';
import {validateEmail, idGen} from '../utils';
var Email = window.smtp;
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host: '',
            password: '',
            username: '',
            recipient: '',
            firstname:'',
            name: '',
            mail: '',
            favori: 'none',
        }
        this.handleChange = this.handleChange.bind(this);
        this.send = this.send.bind(this);
        firebase.auth().onAuthStateChanged(user => {
            firebase.database().ref('/email').once('value').then(snapshot => {
                let data = snapshot.val();
                this.setState(state => ({
                    host: data.host,
                    password: data.password,
                    username: data.username,
                    recipient: data.recipient
                }));
            });
        });
    }
    
    componentDidMount() {
        tWriter();
    }

    send() {
        if (this.state.firstname == '' || this.state.name == '' || this.state.mail == '')
            return alert('Champs requis non completé');
        if (validateEmail(this.state.mail) == false)
            return alert('Email non conforme');
        Email.send({
            Host: this.state.host,
            Username: this.state.username,
            Password: this.state.password,
            To: this.state.recipient,
            From: this.state.username,
            Subject: "Un nouveau loup veut entrer dans la bergerie",
            Body: "Voici les données sur le nouveaux utilisateur <br>\
            <strong>Prénom : </strong>"+ this.state.firstname + "<br>\
            <strong>Nom : </strong>"+ this.state.name + "<br>\
            <strong>E-mail : </strong>"+ this.state.mail + "<br>\
            <strong>Rôle Favori : </strong>"+ this.state.favori+ "<br>\
            <strong>Date d'inscription : </strong>"+ new Date().toLocaleDateString() + "<br><br>\
            Vous pouvez retrouver la liste des utilisateurs à ce lien: <a href='http://localhost:3000/admin'>click</a>"
        }).then(
            message => {
                if (message == 'OK'){
                var id = idGen();
                firebase.database().ref('email/listEmail/' + id).set({
                    id: id,
                    firstname: this.state.firstname,
                    name: this.state.name,
                    mail: this.state.mail,
                    favori: this.state.favori,
                    SubscribeAt: new Date().toLocaleDateString()
                });
                this.setState(state => ({
                    firstname: '',
                    name: '',
                    mail: '',
                    favori: 'none'
                }));
                alert("Votre inscription à bien été pris en compte !");
            }
            else
                alert("Une erreur est survenue. Veuillez réessayer plus tard")
            }
        );
    }

    handleChange(event) {
        console.log(event.target.name);
        this.setState({[event.target.name]: event.target.value});
      }

    render() {
        
        return (
            <div id="sub">
                <div className="opacity">
                    <h2 className="tw"></h2>
                    <div className="form-style-5">
                        <legend>Tentez de ganger une clé de la bêta !</legend>
                        <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} placeholder="Ton Prénom *" />
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Ton Nom *" />
                        <input type="email" name="mail" value={this.state.mail} onChange={this.handleChange} placeholder="Ton mail *" />
                        <label htmlFor="job">Ton Rôle favoris:</label>
                        <select id="job" name="favori" value={this.state.favori} onChange={this.handleChange}>
                            <option value="none">Selection du rôle</option>
                            <option value="Villageois">Villageois</option>
                            <option value="Loup-Garou">Loup-Garou</option>
                            <option value="Sorcière">Sorcière</option>
                            <option value="Voyante">Voyante</option>
                            <option value="Loup Blanc">Loup Blanc</option>
                            <option value="Loup Bavard">Loup Bavard</option>
                            <option value="Chasseur">Chasseur</option>
                            <option value="Petite fille">Petite fille</option>
                            <option value="Other">Autre</option>
                        </select>
                        <button onClick={this.send}>Apply</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form;