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
            let res = await ajax("/api/board-info",{_id: this.props.match.params.boardId});
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
            let res = await ajax("/api/board-edit",
                {id:this.state.id, title: this.state.title,posts: this.state.posts});
            if(res.result !== false)
                onBoardEdit();
            else 
                this.setState({
                    alert : true,
                    alert_msg : res.msg
                });
        }
    }
    
    componentWillMount() {
        console.log(this.props.match.params.boardId);
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
        return (
            <div>
                <div>{alertDiv}</div>
                <h1>게시판 글 수정</h1>
                <h2>제목 : <input type="text" onChange={this.handleChange} value={this.props.location.state.title} name="title" class="form-control" /></h2>
                <h2>글 내용</h2>
                <textarea name="posts" class="form-control" onChange={this.handleChange}>{this.props.location.state.posts}</textarea>
                <button><Link to="/" onClick={this.board_edit}> 완료 </Link></button>
            </div>
        )
    }
}

NoticeBoardEdit.defaultProps={
    onBoardEdit : () => console.warn("onBoardEdit undefined")
}

export default NoticeBoardEdit