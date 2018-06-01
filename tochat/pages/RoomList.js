import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {ajax} from '../tools/utils';

class RoomList extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id : "",
            room_list : []
        }
        this.room_list_get = async () => {
            let res = await ajax("/api/room-list");
            if(res.result !== null && res.result !== false){
                console.log(res.result);
                this.setState({
                    room_list : res.result
                })
            }
        }
    }
    componentWillMount() {
        this.setState({
            user_id : window.sessionStorage.getItem("user_id")
        })
        this.room_list_get();
    }
    render(){
        const h2style= {
            borderBottomColor: 'black'
        }
        if(this.state.room_list[0]){
            return(
                <div>
                    <h2 style={h2style}>채팅방 목록</h2>
                    <ul>
                    {this.state.room_list.map((row)=>{
                        return (
                            <li>
                                <h2>{row.name}</h2>
                                <button><Link to={`/chat?id=${row.id}`}>채팅방 입장</Link></button>
                            </li>
                        );
                    })}
                    </ul>
                    <button><Link to="/RoomCreate">채팅방 생성</Link></button>
                </div>
            );
        } else {
            return(
                <div>
                    <h2 style={h2style}>채팅방 목록</h2>
                    <h3>방이 없습니다.</h3>
                    <button><Link to="/RoomCreate">채팅방 생성</Link></button>
                </div>
            )
        }
        
    }
}

export default RoomList;