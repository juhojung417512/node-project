import React,{Component} from 'react';
import {ajax} from "../tools/utils"

class Signup extends Component{
    static defaultProps() {
        onSignup : () => console.warn("onLogin undefined")
    }
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
        this.handleSignup = async()=>{
            let res = await ajax('/api/signup',{
                _id : this.state.user_id,
                _pw : this.state.pw,
                _name: this.state.name
            })

            if(res.result === false)
            {
                this.setState({
                    error: true,
                    error_msg: "이미 사용중인 ID 입니다."
                });
            } else {
                this.props.onSignup({
                    user_id : this.state.user_id,
                    name : this.state.name,
                    pw: this.state.pw
                });
                window.location="/";
            }
        }
    }
    render() {
        const style={
            border: "1px solid black",
            padding: "8px",
            margin: "8px"
        };
        var errorDiv;
        if(this.state.error)
        {
            errorDiv = (
                <div>
                    {window.confirm(this.state.error_msg)}
                </div>
            );
            this.setState({
                error: false
            });
        } else { 
            errorDiv=(
                <div>
                </div>
            );
        }
        return (
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
                <input
                    name="name"
                    placeholder="User Name"
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSignup}> 회원가입 </button>
            </div>
        );
    }
}

export default Signup;