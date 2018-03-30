import React, { Component } from 'react';
import { HubConnection } from '@aspnet/signalr';

class SimpleChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            message: '',
            messages: [],
            hubConnection: null
        };
    }

    componentDidMount = () => {
        const nick = window.prompt('Your name:', 'John');
        const hubConnection = new HubConnection('http://localhost:60931/chat');
        this.setState({ hubConnection, nick }, () => {
            this.state.hubConnection
                        .start()
                        .then(() => console.log('Connection started...'))
                        .catch(err => console.log('Errror while establishing connection ' + err))
            this.state.hubConnection.on('Send', (nick, receivedMessage) => {
                const text = `${nick}: ${receivedMessage}`
                const messages = this.state.messages.concat([text])
                this.setState({ messages })
            })
        });
    }
    
sendMessage = () => {
    this.state.hubConnection
        .invoke('Send', this.state.nick, this.state.message)
        .catch(err => console.log(err))
    this.setState({message: ''})
}

    render() {
        return <div> 
            <br/>
            <input type="text" value={this.state.message}
            onChange={e => this.setState({message: e.target.value})}/>
            <button onClick={this.sendMessage}>Send</button>
            <div>{this.state.messages.map((message,index) => (
                <span style={{display:'block'}} key={index}> {message} </span>
            ))}
        </div>
        </div>
    }
}

export default SimpleChat;

