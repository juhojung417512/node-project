import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "../pages/Home"
import About from "../pages/About"
import Posts  from '../pages/Posts';
import Login from '../pages/Login';
import Menu from '../components/Menu';

class Client extends Component{
    constructor(props){
        super(props);
        
        this.state={
            isLogin : false,
            user_id : 0,
            name: 0,
            date: 0,
        }
        
        this.handleLogin = (data) => {
            console.log(data);
            this.setState({
                isLogin : true,
                user_id : data.user_id,
                name : data.name,
                date : data.date
            });
        }
    }
    
    render(){
        if(this.state.isLogin){
            return(
                    <div>
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
                    </div>
            );
        }
    }
}

export default Client;