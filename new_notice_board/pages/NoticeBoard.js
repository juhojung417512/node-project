import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {ajax} from '../tools/utils';

class NoticeBoard extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id : "",
            board_list : []
        }
        this.board_list_get = async() => {
            let rows = await ajax("/api/board-list");
            if(rows.result.length !== 0){
                let board_list = []
                for(var i=0;i<rows.result.length;i++){
                    board_list.push(rows.result[i]);
                }
                this.setState({
                    board_list: board_list
                })
            }
        }
    }
    componentWillMount() {
        this.setState({
            user_id : window.sessionStorage.getItem("user_id")
        })
        this.board_list_get();
    }
    render(){
        return(
            <div>
                <h2>게시판 입니다!</h2>
                <ul>
                {this.state.board_list.map((row)=>{
                    if(this.state.user_id == row.owner){
                        return(
                            <li>
                                <h2>제목 : {row.title}</h2>
                                <h3>내용 : {row.posts}</h3>
                                <h3>등록 날짜 : {row.date}</h3>
                                <button>
                                <Link to={`/NoticeBoardEdit?id=${row.id}`}>수정하기</Link> </button>
                            </li>
                        );
                    } else {
                        return(
                            <li>
                                <h2>제목 : {row.title}</h2>
                                <h3>내용 : {row.posts}</h3>
                                <h3>등록 날짜 : {row.date}</h3>
                            </li>
                        );
                    }
                })}
                </ul>
                <button><Link to="/NoticeBoardRegist">등록하기</Link></button>
            </div>
        )
    }
}

export default NoticeBoard;