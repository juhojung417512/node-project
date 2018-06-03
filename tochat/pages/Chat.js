import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {ajax} from '../tools/utils';
import socketIOClient from 'socket.io-client';
//userid username roomid
// 채팅기록 불러오기
class Chat extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id : "",
            user_name: "",
            room_name: "",
            message: "",
            endpoint: "http://127.0.0.1:3000",
            chatLogs: [(<div>Chatting!</div>)]
        }
        this.handleChange = (e)=>{ 
            this.setState({
                [e.target.name] : e.target.value
            });
        }
        this.onLogin = async () => {
            let isFirst = true;
            if(this.room_name in window.sessionStorage.getItem("room_list"))
                isFirst = false;
            let res = await ajax("/api/into-chat",{
                user_id : this.state.user_id,
                room_name : this.state.room_name,
                isFirst : isFirst
            })
            if(res.result !== false){
                socket.emit("login",{
                    username: this.state.user_name,
                    userid: this.state.user_id
                });
            } else {
                window.alert(res.msg);
            }
        }
        this.sendMessage = async () => {
            let res = await ajax("/api/chat-insert",{
                user_id : this.state.user_id,
                room_name : this.state.room_name,
                history: this.state.message
            })
            if(res.result !== false){
                let socket = socketIOClient(this.state.endpoint);
                socket.emit("chat", {
                    msg: this.state.message,
                    userid: this.state.user_id,
                    username: this.state.user_name,
                    room_id: this.state.room_id
                });
            } else {
                window.alert(res.msg);
            }
        }
    }
    componentWillMount() {
        const query = new URLSearchParams(location.search);
        let room_name = query.get("name");
        this.setState({
            user_id : window.sessionStorage.getItem("user_id"),
            user_name : window.sessionStorage.getItem("name"),
            room_name : room_name
        });
        this.onLogin();
    }
    render(){
        const user = {
            textAlign: 'right'
        };
        const otherUser = {
            textAlign: 'left'
        };
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
                chatLogs.push((<div style={user}>{data.msg} from :<strong> {data.from.name} </strong></div>));
            }else{
                chatLogs.push((<div style={otherUser}>{data.msg} from : <strong> {data.from.name} </strong></div>));
            }
        });
        return(
            <div>
                {this.state.chatLogs}
                <h3>
                    Message : 
                    <input name="message" onChange={this.handleChange} placeholder="message"/>
                    <button onClick={this.sendMessage}> 전송! </button>
                </h3>
            </div>
        );
    }
}

export default Chat;