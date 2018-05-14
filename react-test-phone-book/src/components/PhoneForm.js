import React,{Component} from "react";

class PhoneForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : '',
            phone : ''
        }
        this.handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
        
        this.handleSubmit = (e) =>{
            e.preventDefault();

            this.props.onCeate(this.state);
            this.setState({
                name:'',
                phone:''
            })
        }
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input 
                    placeholder = "전화번호"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    name="phone"
                />
                <input 
                    placeholder = "이름"
                    value={this.state.name}
                    onChange={this.handleChange}
                    name="name"
                />
                <div>{this.state.phone}</div>
                <div>{this.state.name}</div>
                <button type="submit">등록</button>
            </form>
        );
    }
}

export default PhoneForm;