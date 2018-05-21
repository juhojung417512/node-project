import React,{Component} from 'react';

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
        this.handleSignup = ()=>{
            const {onLogin} = this.props;
            const signupObj = this
            fetch('/api/signup',{
                method: 'POST',
                body: JSON.stringify({
                    _id : this.state.user_id,
                    _pw : this.state.pw,
                    _name: this.state.name
            }),
                headers: {"Content-Type": "application/json"}
            }).then(function(response){
                response.json().then((res)=>{
                    if(res.result === false)
                    {
                        signupObj.setState({
                            error: true,
                            error_msg: "이미 사용중인 ID 입니다."
                        });
                    } else {
                        onSignup({
                            user_id : signupObj.state.user_id,
                            name : signupObj.state.name
                        });
                    }
                });
            });
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
                <button onClick={this.handleLogin}> 회원가입 </button>
            </div>
        );
    }
}

export default Signup;