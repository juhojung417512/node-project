import React, { Component } from 'react';
import PhoneForm from "./components/PhoneForm";
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
    ]
  }
  handleCreate = (data) => {
    const {information} = this.state;
    this.setState({
      information: information.concat({id: this.id++, ...data})
    })
    console.log(data);
  }
  render() {
    const {information} = this.state;
    return (
      <div className="App">
        <PhoneForm 
          onCeate ={this.handleCreate}
        />
        {JSON.stringify(information)}
      </div>
    );
  }
}

export default App;