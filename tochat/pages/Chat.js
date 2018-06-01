import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {ajax} from '../tools/utils';

class Chat extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id : "",
            room_list : []
        }
    }
    componentWillMount() {
        this.setState({
            user_id : window.sessionStorage.getItem("user_id")
        })
    }
    render(){
        return(
            <div>
                방이 없습니다.
            </div>
        );
    }
}

export default Chat;