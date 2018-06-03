import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {ajax} from '../tools/utils';
import socketIOClient from 'socket.io-client';
//userid username roomid
class Chat extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id : "",
            room_list : [],
            endpoint: "http://127.0.0.1:3000",
            chatLogs: [(<div>Chatting!</div>)]
        }
    }
    componentWillMount() {
        this.setState({
            user_id : window.sessionStorage.getItem("user_id")
        });
    }
    render(){
        let socket = socketIOClient(this.state.endpoint);
        socket.on("login",function(data){
            const {chatLogs} = this.state;
            chatLogs.push((<div><strong>{data}</strong> has joined</div>))
            this.setState({
                chatLogs: chatLogs
            });
        });

        socket.on("chat",function(data){
            const {chatLogs} = this.state;
            const {name} = this.props;
            if(name == data.from.name){
                chatLogs.push((<div class='me'>{data.msg} from :<strong> {data.from.name} </strong></div>));
            }else{
                chatLogs.push((<div class='you'>{data.msg} from : <strong> {data.from.name} </strong></div>));
            }
        })
        return(
            <div>
                {this.state.chatLogs}
            </div>
        );
    }
}

export default Chat;