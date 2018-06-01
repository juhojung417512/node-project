import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {ajax} from "../tools/utils"

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            user_id: "",
            pw: "",
            name: "",
            error : false,
            error_msg: ""
        }
        this.handleChange = (e)=>{
            this.setState({
                [e.target.name] : e.target.value
            });
        }
    
        this.handleLogin = async ()=>{
            const {onLogin} = this.props;
            let res = await ajax("/api/login",{
                _id : this.state.user_id,
                _pw : this.state.pw
            })
            if(res.result === false)
            {
                this.setState({
                    error: true,
                    error_msg: res.msg
                });
            } else {
                onLogin({
                    user_id : res.result.user_id,
                    name : res.result.name,
                    pw: res.result.pw
                });
                window.location="/";
            }            
        }
    }
    
    render(){
        const style={
            border: "1px solid black",
            padding: "8px",
            margin: "8px"
        };
        var errorDiv=(
            <div>
            </div>
        );
        if(this.state.error)
        {
            errorDiv = (
                <span>
                    {window.confirm(this.state.error_msg)}
                </span>
            );
            this.setState({
                error: false
            });
        }
        return(
            <div style={style}>
                <div>{errorDiv}</div>
                <input 
                    name="user_id"
                    placeholder="ID"
                    onChange={this.handleChange}
                />
                <input
                    name="pw"
                    placeholder="PW"
                    onChange={this.handleChange}
                />
                <button onClick={this.handleLogin}> 로그인 </button>
            </div>
        );
    }    
}

Login.defaultProps= {
    onLogin : () => console.warn("onLogin undefined")
}

export default Login;