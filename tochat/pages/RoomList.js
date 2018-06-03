import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {ajax} from '../tools/utils';

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
            let res = await ajax("/api/room-list/mine", this.state.user_id);
            if(res.result !== null && res.result !== false){
                console.log(res.result);
                this.setState({
                    room_list_mine : res.result
                });
                
                // session storage 저장해줘야함. indexing 도 해야함 
            } else{
                window.alert(res.msg);
            }

            let res = await ajax("/api/room-list/open");
            if(res.result !== null && res.result !== false){
                console.log(res.result);
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
        this.setState({
            user_id : window.sessionStorage.getItem("user_id")
        })
        this.room_list_get();
    }
    render(){
        const h2style= {
            borderBottomColor: 'black'
        }
        let room_list_div = [(<li> 나의 채팅방 </li>)]; // 표시될 채팅방 div
        let room_list = [] // 채팅방 이름 리스트 
        this.state.room_list_mine.map((row)=>{
            room_list.push(row.name);
            room_list_div.push(
                <li>
                    <h2>{row.name}</h2>
                    <button><Link to={`/chat?name=${row.name}`}>채팅방 입장</Link></button>
                </li>
            );
        });
        room_list_div.push(<li> 오픈 채팅방 </li>)
        this.state.room_list_open.map((row)=>{
            room_list.push(row.name);
            room_list_div.push(
                <li>
                    <h2>{row.name}</h2>
                    <button><Link to={`/chat?name=${row.name}`}>채팅방 입장</Link></button>
                </li>
            );
        });
        window.sessionStorage.setItem("room_list",room_list);
        if(this.room_list_div.length !== 2){
            //중복처리 해야함
            return(
                <div>
                    <h2 style={h2style}>채팅방 목록</h2>
                    <ul>
                        {this.room_list_div}
                    </ul>
                    <input name="room_name" onChange={this.handleChange} placeholder="Room Name Insert!"/>
                    체크시 오픈방<input type="checkbox" onChange={this.handleCheckBox} />
                    <button onClick={this.room_create}> 채팅방 생성 </button>
                </div>
            );
        } else {
            return(
                <div>
                    <h2 style={h2style}>채팅방 목록</h2>
                    <h3>방이 없습니다.</h3>
                    <input name="room_name" onChange={this.handleChange} placeholder="Room Name Insert!"/>
                    체크시 오픈방<input type="checkbox" onChange={this.handleCheckBox} />
                    <button onClick={this.room_create}> 채팅방 생성 </button>
                </div>
            )
        }
        
    }
}

RoomList.defaultProps={
    user_id : ""
}

export default RoomList;