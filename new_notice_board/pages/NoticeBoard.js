import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import NoticeBoardEdit from "./NoticeBoardEdit"
import {ajax} from '../tools/utils';

class NoticeBoard extends Component{
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
    }
    componentWillMount: function(){
        console.log("adsasd");
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
                                <Route path="/NoticeBoardEdit" render={props=> 
                                <NoticeBoardEdit isEdit={true} notice={{
                                    title: row.title, 
                                    posts: row.posts, 
                                    date: row.date, 
                                    id: row.id}
                                    } />}>수정하기</Route>
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
                <Route path="/NoticeBoardEdit" component={NoticeBoardEdit}>등록하기</Route>
            </div>
        )
    }
}


NoticeBoard.defaultProps= {
    currentUser : null
}

export default NoticeBoard;