import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "../pages/Home"
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import RoomList from '../pages/RoomList';
import Chat from '../pages/Chat';
import NoticeBoardEdit from '../pages/NoticeBoardEdit';
import NoticeBoardRegist from '../pages/NoticeBoardRegist';
import Menu from '../components/Menu';
import {ajax} from "../tools/utils"

class Client extends Component{
    constructor(props){
        super(props);
        this.state={
            isLogin : false,
            user_id : 0,
            name: 0
        }
        
        this.handleLogin = (data) => {
            this.setState({
                isLogin : true,
                user_id : data.user_id,
                name : data.name,
                pw: data.pw
            });
            window.sessionStorage.setItem("user_id",data.user_id);
            window.sessionStorage.setItem("name",data.name);
            window.sessionStorage.setItem("pw",data.pw);
            window.confirm("성공!");
        }

        this.userSearch = async () => {
            let res = await ajax("/api/user-search",{
                user_id: this.state.user_id,
                pw: this.state.pw
            })
            if(res.result !== false){
                this.setState({
                    isLogin : true,
                    user_id : res.result.user_id,
                    name: res.result.name,
                    pw: res.result.pw
                })
            }
        }

        this.handleBoardRegist = () => {
            window.confirm("등록완료!")
        }
        this.handleBoardEdit = () => {
            window.confirm("수정완료!")
        }
    }
    
    componentWillMount() {
        if(window.sessionStorage.getItem("user_id") !== null){
            this.setState({
                isLogin : true,
                user_id : window.sessionStorage.getItem("user_id"),
                name : window.sessionStorage.getItem("name"),
                pw: window.sessionStorage.getItem("pw")
            });
        }
        this.userSearch();
    }
    
    //router 안에다가 route 몰아넣기
    render(){
        if(this.state.isLogin){
            return(
                <div>
                    <h2>User Id : {this.state.user_id}</h2>
                    <h2>Name : {this.state.name}</h2>
                    <Menu isLogin={this.state.isLogin}/>
                    <Route exact path="/" component={Home} />
                    <Route path="/room-list" render={props=> <RoomList user_name={this.state.name} />} />
                    <Route path="/chat" render={props=> <Chat user_name={this.state.name} />} />
                    <Route path="/NoticeBoardEdit" render={props=> <NoticeBoardEdit onBoardEdit={this.handleBoardEdit}/>}/>
                    <Route path="/NoticeBoardRegist" render={props=> <NoticeBoardRegist user_id={this.state.user_id} onBoardRegist={this.handleBoardRegist}/>}/>
                </div>
            );
        }
        else {
            return(
                <div>
                    <Menu isLogin={this.state.isLogin}/>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" render={props=> <Login onLogin={this.handleLogin} />}/>
                    <Route path="/signup" render={props=> <Signup onSignup={this.handleLogin} />}/>
                </div>
            );
        }
    }
}

export default Client;