import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "../pages/Home"
import About from "../pages/About"
import Posts  from '../pages/Posts';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Menu from '../components/Menu';

class Client extends Component{
    constructor(props){
        super(props);
        this.state={
            isLogin : false,
            user_id : 0,
            name: 0
        }
        
        this.handleLogin = (data) => {
            console.log(data);
            this.setState({
                isLogin : true,
                user_id : data.user_id,
                name : data.name
            });
        }
        fetch('/api',{
            method: 'get',
            headers: {"Content-Type": "application/json"}
        }).then(function(response){
            response.json().then((res)=>{
                if(res.result !== false){
                    this.setState({
                        isLogin : true,
                        user_id : res.result.user_id,
                        name: res.result.name
                    })
                }
            })
        });
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
                        <Switch>
                            <Route path="/about/:name" component={About} />
                            <Route path="/about" component={About} />
                        </Switch>
                        <Route path="/posts" component={Posts}/>
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