import React,{Component} from 'react';
import {ajax} from '../tools/utils';

class NoticeBoard extends Component{
    static defaultProps = {
        currentUser : null
    }
    constructor(props){
        super(props);
        this.state = {
            board_list : []
        }
        this.board_list_get = async() =>{
            let rows = await ajax("/api/board-list");
            if(rows.length !== 0){
                let board_list = []
                for(var i=0;i<rows.length;i++){
                    board_list.push(rows[i]);
                }
                this.setState({
                    board_list: board_list
                })
            }
        }
        this.notice_list_edit = async() =>{
            //
        }
    }
    componentWillMount() {
        this.board_list_get();
    }
    render(){
        return(
            <div>
                <ul>
                {this.state.board_list.map((row)=>{
                    if(this.props.currentUser.user_id == notice.owner){
                        return(
                            <li>
                                <h2>제목 : {row.title}</h2>
                                <h3>내용 : {row.posts}</h3>
                                <h3>등록 날짜 : {row.date}</h3>
                                <button class="btn btn-primary" type="submit" onclick={this.notice_list_edit}>수정하기</button>
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
            </div>
        )
    }
}

export default NoticeBoard;