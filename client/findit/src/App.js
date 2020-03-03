import React from 'react';
import logo from './logo.svg';
import UserDataEntry from "./components/UserDataEntry";
import DisplayImages from "./components/DisplayImages";
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormSubmitted: false,
      images: []
    };
    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm(obj) {
    try{
      const res = await axios.post('http://localhost:3000/processImages', {
          searchWord: obj.searchWord,
          dateStolen: obj.month + " " + obj.day,
          zipCode: obj.zipcode,
          descriptions: obj.desc.split(',')
      });
      console.log(res);
      if(res.data.length === 0) {
        this.setState({isFormSubmitted: true});
      }
      else {
        this.setState({isFormSubmitted: true, images: res.data});
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (!this.state.isFormSubmitted) {
      return (
          <div>
            <UserDataEntry submitForm={this.submitForm}/>
          </div>
      )
    }
    else {
      return (
          <div>
            <DisplayImages images={this.state.images}/>
          </div>
      )
    }
  }
}
export default App;
