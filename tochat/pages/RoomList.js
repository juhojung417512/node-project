import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {ajax} from '../tools/utils';
// room list session storage 저장해줘야함. indexing 도 해야함 
class RoomList extends Component{
    constructor(props){
        super(props);
        this.state = {
            room_list_mine : [],
            room_list_open: [],
            room_name : "",
            isOpen: 0,
        }
        this.handleChange = (e)=>{
            this.setState({
                [e.target.name] : e.target.value
            });
        }
        this.handleCheckBox = () =>{
            this.setState({
                isOpen : this.state.isOpen == 1 ? 0 : 1
            })
        }
        this.room_list_get = async () => {
            let res = await ajax("/api/room-list/mine", {
                user_id:this.props.user_id
            });
            if(res.result !== false){
                this.setState({
                    room_list_mine : res.result
                });
                
            } else{
                window.alert(res.msg);
            }
            res = await ajax("/api/room-list/open",{
                user_id: this.props.user_id
            });
            if(res.result !== false){
                this.setState({
                    room_list_open : res.result
                })
            } else{
                window.alert(res.msg);
            }
        }
        
        this.room_create = async () => {
            let res = await ajax("/api/room-create",{
                user_id:this.props.user_id,
                room_name: this.state.room_name,
                isOpen: this.state.isOpen
            });
            if(res.result !== false){
                window.confirm("방 생성 완료!");
                window.location = "/chat";
            } else {
                window.confirm("방을 생성할 수 없습니다.");
            }
        }
    }
    componentWillMount() {
        this.room_list_get();
    }
    render(){
        const h2style= {
            borderBottomColor: 'black',
            
        }
        let room_list_div = [(<h2> 나의 채팅방 <hr/></h2>)]; // 표시될 채팅방 div
        let room_list = [] // 채팅방 이름 리스트 
        this.state.room_list_mine.map((row)=>{
            room_list.push(row.name);
            room_list_div.push(
                <li>
                    <h3>{row.name} <button><Link to={`/chat?name=${row.name}`}>채팅방 입장</Link></button></h3>
                </li>
            );
        });
        room_list_div.push(<h2> 오픈 채팅방 <hr/></h2>)
        this.state.room_list_open.map((row)=>{
            room_list.push(row.name);
            room_list_div.push(
                <li>
                    <h3>{row.name} <button><Link to={`/chat?name=${row.name}`}>채팅방 입장</Link></button></h3>
                </li>
            );
        });
        window.sessionStorage.setItem("room_list",room_list);
        return(
            <div>
                <h2>채팅방 생성</h2>
                <input name="room_name" onChange={this.handleChange} placeholder="Room Name Insert!"/>
                 체크시 오픈방 <input type="checkbox" onChange={this.handleCheckBox} />
                <button onClick={this.room_create}> 생성 </button>
                <h2 style={h2style}>채팅방 목록</h2><hr/>
                <ul>
                    {room_list_div}
                </ul>
                
            </div>
        );
        
    }
}

RoomList.defaultProps={
    user_id : ""
}

export default RoomList;