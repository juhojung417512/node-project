import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {ajax} from '../tools/utils';
class NoticeBoardEdit extends Component{
    constructor(props){
        super(props);
        this.state= {
            id: 0,
            title: "",
            posts: "",
            alert_msg: "",
            alert : false
        }
        this.handleChange = (e)=>{ 
            this.setState({
                [e.target.name] : e.target.value
            });
        }
        this.board_info = async()=> {
            const query = new URLSearchParams(location.search);
            let boardId = query.get("id");
            let res = await ajax("/api/board-info",{_id: boardId});
            if(res.result !== false){
                this.setState({
                    id: res.result.id,
                    title: res.result.title,
                    posts: res.result.posts
                });
            } else {
                this.setState({
                    alert: true,
                    alert_msg: res.msg
                })
            }
        }
        this.board_edit = async ()=> {
            const {onBoardEdit} = this.props;
            let res = await ajax("/api/board-edit",
                {id:this.state.id, title: this.state.title,posts: this.state.posts});
            console.log(res);
            if(res.result !== false){
                onBoardEdit();
                window.location="/NoticeBoard";
            }
            else 
                this.setState({
                    alert : true,
                    alert_msg : res.msg
                });
        }
    }
    
    componentWillMount() {
        this.board_info();
    }
    
    render(){
        var alertDiv=(
                <div>
                </div>
            );
        if(this.state.alert)
        {
            alertDiv = (
                <span>
                    {window.confirm(this.state.alert_msg)}
                </span>
            );
            this.setState({
                alert: false
            });
        }
        if(this.state.id != 0){
            return (
                <div>
                    <div>{alertDiv}</div>
                    <h1>게시판 글 수정</h1>
                    <h2>제목 : <input type="text" onChange={this.handleChange} value={this.state.title} name="title" class="form-control" /></h2>
                    <h2>글 내용</h2>
                    <textarea name="posts" class="form-control" onChange={this.handleChange}>{this.state.posts}</textarea>
                    <button onClick={this.board_edit}> 완료 </button>
                </div>
            )
        } else {
            return(
                <div>
                    <h1>Wait....</h1>
                </div>
            )
        }
    }
}

NoticeBoardEdit.defaultProps={
    onBoardEdit : () => console.warn("onBoardEdit undefined")
}

export default NoticeBoardEdit