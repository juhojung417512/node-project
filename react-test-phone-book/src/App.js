import React, { Component } from 'react';
import PhoneForm from "./components/PhoneForm";
import PhoneInfoList from "./components/PhoneInfoList"

class App extends Component {
  id= 2;
  state={
    information : [
      {
        id: 0,
        name: "홍길동",
        phone: "010-51512321-151245"
      },
      {
        id:1,
        name:"ghdrflehd",
        phone:"sadasdasdasdas"
      }
    ],
    keywords: ''
  }

  handleChange = (e) =>{
    this.setState({
      keywords : e.target.value
    })
  }

  handleCreate = (data) => {
    const {information, keywords} = this.state;
    this.setState({
      information: information.concat({id: this.id++, ...data})
    })
    console.log(data);
  }

  handleRemove = (id) => {
    const {information} = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }

  handleUpdate = (id,data) => {
    const {information} = this.state;
    this.setState({
      information: information.map(
        info=> id === info.id ? {...info,...data} : info
      )
    })
  }

  render() {
    const {information, keywords} = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(
        keywords) !== -1
    );
    return (
      <div className="App">
        <PhoneForm 
          onCreate ={this.handleCreate}
        />
        <p>
          <input
            placeholder = "검색할 단어를 입력해주세요.."
            onChange={this.handleChange}
            value={keywords}
          />
        </p>
        <PhoneInfoList 
          data={filteredList} 
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
