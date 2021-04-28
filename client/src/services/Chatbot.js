import React, {Component} from 'react';
import {
    Container, Jumbotron, Form, Button
} from 'react-bootstrap'

export default class Chatbot extends Component{
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            allButtons: [],
            buttonText : ['What is PHMS', 'How to Login', "How to signup"],
            allChats :[]
        }
    }

    onSubmit(temp){
        console.log(temp)
        if(temp == "What is PHMS"){
            
        }
        
    }

    componentDidMount(){
        const info = []
        for(let i = 0; i < this.state.buttonText.length; i++){
            console.log("here1")
            info.push(
                <><Button variant="dark" onClick={() => this.onSubmit(this.state.buttonText[i])}>
                    {this.state.buttonText[i]}
                </Button><br></br><br></br></> 
            )
        }
        this.setState({allButtons: info})
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    {this.state.allChats}
                    {this.state.allButtons}
                </Jumbotron>
            </Container>
        )
    }
}

