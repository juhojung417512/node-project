import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {ajax} from '../tools/utils';
class NoticeBoardRegist extends Component{    
    constructor(props){
        super(props);
        this.state= {
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
        this.board_regist = async ()=> {
            const {onBoardRegist} = this.props;
            let res = await ajax("/api/board-regist",
                {user_id: this.props.user_id,title: this.state.title,posts: this.state.posts});
            if(res.result !== false)
                onBoardRegist();
            else
                this.setState({
                    alert : true,
                    alert_msg : res.msg
                });
        }
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
                <h1>게시판 글 등록</h1>
                <h2>제목 : <input type="text" onChange={this.handleChange} name="title" class="form-control" /></h2>
                <h2>글 내용</h2>
                <textarea name="posts" class="form-control" onChange={this.handleChange}></textarea>
                <button><Link to="/" onClick={this.board_regist}> 완료 </Link></button>
            </div>
        )
    }
}

NoticeBoardRegist.defaultProps={
    user_id : 0,
    onBoardRegist : () => console.warn("onBoardRegist undefined")
}

export default NoticeBoardRegist