import React,{Component} from 'react';

class Login extends Component{
    static defaultProps() {
        onLogin : () => console.warn("onLogin undefined")
    }
    constructor(props){
        super(props);
        this.state={
            user_id: "",
            pw: "",
            name: "",
            date : "",
            error : false,
            error_msg: ""
        }
        this.handleChange = (e)=>{ 
            this.setState({
                [e.target.name] : e.target.value
            });
        }
    
        this.handleLogin = ()=>{
            const {onLogin} = this.props;
            const loginObj = this
            fetch('/login',{
                method: 'POST',
                body: JSON.stringify({
                    _id : this.state.user_id,
                    _pw : this.state.pw
            }),
                headers: {"Content-Type": "application/json"}
            }).then(function(response){
                response.json().then((res)=>{
                    if(res.result === false)
                    {
                        loginObj.setState({
                            error: true,
                            error_msg: "아이디 혹은 패스워드가 잘못되었습니다."
                        });
                    } else {
                        onLogin({
                            user_id : loginObj.state.user_id,
                            name : loginObj.state.name,
                            date : loginObj.state.date
                        });
                    }
                });
            });
        }
    }
    
    render(){
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

export default Login;