import React, {Component} from "react";

const Problematic = () => {
    throw (new Error("버그가 나타났다!"));
    return(
        <div>
        </div>
    );
};

class Counter extends Component{
    id=2;
    constructor(props){
        super(props);
        this.state={
            number : 0,
            error: false
        };
        console.log("constructor");
    }

    handleIncrease = () => {
        this.setState({
            number : this.state.number + 1
        });
    }

    handleDecrease = () => {
        this.setState({
            number: this.state.number - 1
        });
    }

    componentDidMount(){
        //외부 라이브러리 연동 : ㅇ3 
        //컴포넌트에서 필요한 데이터 요청 : ajax
        //DOM

    }

    static getDerivedStateFromPorps(){
        // not setstate, props 바뀔때 설정하고 설정하고싶은 state 값 리턴
        // if (nextProps.value !== prevState.value) {
        //     return { value: nextProps.value };
        // }
        // return null;
    }

    shouldComponentUpdate(nextProps,nextState){
        // return false 하면 업데이트를 안함
        // return this.props.checked !== nextProps.checked
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        // DOM 업데이트가 일어나기 직전의 시점입니다.
        // 새 데이터가 상단에 추가되어도 스크롤바를 유지해보겠습니다.
        // scrollHeight 는 전 후를 비교해서 스크롤 위치를 설정하기 위함이고,
        // scrollTop 은, 이 기능이 크롬에 이미 구현이 되어있는데, 
        // 이미 구현이 되어있다면 처리하지 않도록 하기 위함입니다.
        // if(prevState.array !== this.state.array){
        //     const{
        //         scrollTop, scrollHeight
        //     } = this.list;
        //     return{
        //         scrollTop, scrollHeight
        //     };
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        // console.log('componentDidUpdate');
        // if(snapshot){
        //     const{scrollTop} = this.list;
        //     if(scrolltop !== snapshot.scrollTop) return;
        //     const diff= this.list.scrollHeight - snapshot.scrollHeight;
        //     this.list.scrollTop += diff;
        // }
    }
    componentWillUnmount() {
        // 이벤트, setTimeout, 외부 라이브러리 인스턴스 제거
    }

    componentDidCatch(error, info) {
        this.setState({
            error: true
        });
    }

    render(){
        if(this.state.error) return(<h1>에러발생!</h1>);
        return(
            <div>
                <h1>카운터</h1>
                <div>값 : {this.state.number}</div>
                {this.state.number === 4 && <Problematic />}
                <button onClick={this.handleIncrease}>+</button>
                <button onClick={this.handleDecrease}>-</button>
            </div>
        )
    }
}

export default Counter;