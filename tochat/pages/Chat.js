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
            chatLogs: [(<div>Chatting!</div>)],
        }
        this.handleChange = (e)=>{ 
            this.setState({
                [e.target.name] : e.target.value
            });
        }
        this.onLogin = async () => {
            let room_list = window.sessionStorage.getItem("room_list");
            let isFirst = true;
            if( room_list.search(this.state.room_name) === 0)
                isFirst = false;

            let rows = await ajax("/api/into-chat",{
                user_id : this.state.user_id,
                user_name: this.state.user_name,
                room_name : this.state.room_name,
                isFirst : isFirst
            })
            const socket = socketIOClient(this.state.endpoint);
            if(rows.result !== false){
                const user = {
                    textAlign: 'right'
                };
                const otherUser = {
                    textAlign: 'left'
                };
                socket.emit("login",{
                    username: this.state.user_name,
                    userid: this.state.user_id
                });
                let chatLogs = this.state.chatLogs;
                for(var i =0;i<rows.result.length; i++){
                    chatLogs.push(
                        <div style={user}>
                            {rows.result[i].history} from : 
                            <strong> {rows.result[i].user_name} </strong>
                        </div>);
                }
                this.setState({
                    chatLogs: chatLogs
                });
            } else {
                window.alert(rows.msg);
            }
        }
        this.sendMessage = async () => {
            let res = await ajax("/api/chat-insert",{
                user_id : this.state.user_id,
                user_name: this.state.user_name,
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
                this.refs.message.value = '';
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
            room_name : room_name,
            ...this.state
        } , ()=>{
            this.onLogin()
        });
        const user = {
            textAlign: 'right'
        };
        const otherUser = {
            textAlign: 'left'
        };
        let socket = socketIOClient(this.state.endpoint);
        let chatLogs = this.state.chatLogs;
        socket.on("login",(data)=>{
            chatLogs.push(
                <div>
                    <strong>{data}</strong> has joined
                </div>);
            this.setState({
                chatLogs: chatLogs
            });
        });
        let username = this.state.user_name;
        socket.on("chat",(data)=>{
            if(username == data.from.name){
                chatLogs.push(
                    <div style={user}>
                        {data.msg} from : 
                        <strong> {data.from.name} </strong>
                    </div>);
            }else{
                chatLogs.push(
                    <div style={otherUser}>
                        {data.msg} from : 
                        <strong> {data.from.name} </strong>
                    </div>);
            }
            this.setState({
                chatLogs: chatLogs
            });
        });
    }
    render(){
        return(
            <div>
                <div>
                    {this.state.chatLogs}
                </div>
                <h3>
                    Message : 
                    <input name="message" ref="message" onChange={this.handleChange} placeholder="message"/>
                    <button onClick={this.sendMessage}> 전송! </button>
                </h3>
            </div>
        );
    }
}

export default Chat;