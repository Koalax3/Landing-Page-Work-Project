import React, { Component } from 'react';
import './Form.css';
var Email = window.smtp;

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname:'',
            name: '',
            mail: '',
            favori: 'none',
        }

        this.handleChange = this.handleChange.bind(this);
        this.send = this.send.bind(this);
    }
    send() {
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "koalax3d@gmail.com",
            Password: "1cb79b91-dd9f-4bd4-9b59-fd44087c397f",
            To: 'lucas.depret@epitech.eu',
            From: "koalax3d@gmail.com",
            Subject: "Un nouveau loup veut entrer dans la bergerie",
            Body: "Voici les données sur le nouveaux utilisateur <br>\
            <strong>Prénom : </strong>"+ this.state.firstname + "<br>\
            <strong>Nom : </strong>"+ this.state.name + "<br>\
            <strong>E-mail : </strong>"+ this.state.mail + "<br>\
            <strong>Rôle Favori : </strong>"+ this.state.favori+ "<br>\
            <strong>Date d'inscription : </strong>"+ new Date().toLocaleDateString() + "<br><br>\
            Vous pouvez retrouver la liste des utilisateurs à ce lien: <a href='google.fr'>click</a>"
        }).then(
            message => alert(message)
        );
    }

    handleChange(event) {
        console.log(event.target.name);
        this.setState({[event.target.name]: event.target.value});
      }

    render() {
        return (
            <div className="form-style-5">
                        <legend>Inscris-toi et gagnes une clé de la bêta !</legend>
                        <input type="text" name="firstname" onChange={this.handleChange} placeholder="Ton Prénom *" />
                        <input type="text" name="name" onChange={this.handleChange} placeholder="Ton Nom *" />
                        <input type="email" name="mail" onChange={this.handleChange} placeholder="Ton mail *" />
                        <label htmlFor="job">Ton Rôle favoris:</label>
                        <select id="job" name="favori" onChange={this.handleChange}>
                                <option value="none">Selection du rôle</option>
                                <option value="Villageois">Villageois</option>
                                <option value="Loup-Garou">Loup-Garou</option>
                                <option value="Sorcière">Sorcière</option>
                                <option value="Voyante">Voyante</option>
                                <option value="Loup Blanc">Loup Blanc</option>
                                <option value="Loup Bavard">Loup Bavard</option>
                                <option value="Chasseur">Chasseur</option>
                                <option value="other">Autre</option>
                        </select>
                    <button onClick={this.send}>Apply</button>
            </div>
        );
    }
}

export default Form;