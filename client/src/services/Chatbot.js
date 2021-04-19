import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    Container,
} from 'react-bootstrap'

export default class Chatbot extends Component{
    talk(event){
        var know = {
            "hello": "Hello I Am A Simple Chatbot. I Am Here To Help You!",
            "hi": "Hii, Tell me something about yourself ??",
            "how are you?": "I am great !!",
            "life is like hell": "Are you in TY COMP at COEP ?",
            "tell me a random fact": "Life would have been much easy, if there was no Abhijit Sir.",
            "yes": "Okay ! Have A Great Day !!"
        }
        console.log(event);
        if(event.keyCode === 13){
            
            var user = document.getElementById("userbox").value
            document.getElementById("userbox").value = ""
            document.getElementById("chatLog").innerHTML += user + "<br>"
            
            if(user in know){
                document.getElementById("chatLog").innerHTML += "> " + know[user] + "<br><br>"
            }
            else{
                document.getElementById("chatLog").innerHTML += "> " + "Sorry I Can't Understand. <br><br>"
            }
        }
    }
    render() {
        return (
            <Container>
                <h2>CHATBOT</h2>
                <h4 id="chatLog"></h4>
                <div style={{ textAlign: "" }}>
                    <input id="userbox" type="text" onKeyDown={this.talk}></input>
                </div>
                <h3>Hello I am CHABOT, Ask me your queries !</h3>
            </Container>
        )
    }
}
