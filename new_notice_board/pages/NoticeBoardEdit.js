import React, {Component} from "react";

class NoticeBoardEdit extends Component{
    
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
        this.notice_edit = async ()=> {
            let res = await ajax("/api/board-edit",
                {id:this.props.id, title: this.state.title,posts: this.state.posts});
            if(res.result !== false)
                console.log("ASDASD// route to notice_board");
            this.setState({
                alert : true,
                alert_msg : res.msg
            });
        }
        this.notice_regist = async ()=> {
            let res = await ajax("/api/board-regist",
                {title: this.state.title,posts: this.state.posts});
            if(res.result !== false)
            console.log("ASDASD// route to notice_board");
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
        if(this.props.isEdit)
        {
            return (
                <div>
                    <div>{alertDiv}</div>
                    <h1>게시판 글 수정</h1>
                    <h2>제목 : <input type="text" onChange={this.handleChange} value={this.props.notice.title} name="title" class="form-control" /></h2>
                    <h2>글 내용</h2>
                    <textarea name="posts" class="form-control" onChange={this.handleChange}>{this.props.notice.posts}</textarea>
                    <button onClick={notice_edit} />
                </div>
            )
        } else {
            return (
                <div>
                    <div>{alertDiv}</div>
                    <h1>게시판 글 등록</h1>
                    <h2>제목 : <input type="text" onChange={this.handleChange} name="title" class="form-control" /></h2>
                    <h2>글 내용</h2>
                    <textarea name="posts" class="form-control" onChange={this.handleChange}></textarea>
                    <button onClick={notice_regist} />
                </div>
            )
        }
    }
}

NoticeBoardEdit.defaultProps= {
    isEdit : false,
    notice : {}
}

export default NoticeBoardEdit