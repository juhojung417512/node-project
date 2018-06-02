import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {ajax} from '../tools/utils';

class RoomList extends Component{
    constructor(props){
        super(props);
        this.state = {
            room_list : [],
            room_name : ""
        }
        this.handleChange = (e)=>{
            this.setState({
                [e.target.name] : e.target.value
            });
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
        
        this.room_create = async () => {
            let res = await ajax("/api/room-create",{
                user_name:this.props.user_name,
                room_name: this.state.room_name
            });
            if(res.result !== false){
                window.confirm("방 생성 완료!");
                window.location = "/chat"; /// 여기 다시 봐야하
            } else {
                window.confirm("방을 생성할 수 없습니다.");
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
                    <input name="room_name" onChange={this.handleChange} placeholder="Room Name Insert!"/>
                    <button onClick={this.room_create}> 채팅방 생성 </button>
                </div>
            );
        } else {
            return(
                <div>
                    <h2 style={h2style}>채팅방 목록</h2>
                    <h3>방이 없습니다.</h3>
                    <input name="room_name" onChange={this.handleChange} placeholder="Room Name Insert!"/>
                    <button onClick={this.room_create}> 채팅방 생성 </button>
                </div>
            )
        }
        
    }
}

RoomList.defaultProps={
    user_name : ""
}

export default RoomList;