import React,{Component}from 'react';
import { NavLink } from 'react-router-dom';

class Menu extends Component{
    handleLogout = () => {
        window.sessionStorage.clear();
        window.confirm("로그아웃 되었습니다.");
        window.location="/";
    }
    render() {
        const activeStyle = {
            color: 'green',
            fontSize: '2rem'
        };
        if(this.props.isLogin){
            return (
                <div>
                    <ul>
                        <li><NavLink exact activeStyle={activeStyle} to="/">Home</NavLink></li>
                        <li><NavLink exact activeStyle={activeStyle} to="/about">About</NavLink></li>
                        <li><NavLink activeStyle={activeStyle} to="/about/foo">About Foo</NavLink></li>
                        <li><NavLink activeStyle={activeStyle} to="/posts">Posts</NavLink></li>
                        <li><NavLink activeStyle={activeStyle} to="/NoticeBoard">Notice Board</NavLink></li>
                    </ul>
                    <button onClick={this.handleLogout}> 로그아웃 </button>
                    <hr/>
                </div>
            );
        }
        else {
            return (
                <div>
                    <ul>
                        <li><NavLink exact activeStyle={activeStyle} to="/">Home</NavLink></li>
                        <li><NavLink activeStyle={activeStyle} to="/login">Login</NavLink></li>
                        <li><NavLink activeStyle={activeStyle} to="/signup">Signup</NavLink></li>
                    </ul>
                    <hr/>
                </div>
            );
        }
    }
    
}

export default Menu;