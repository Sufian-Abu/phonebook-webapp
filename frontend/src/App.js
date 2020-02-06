import React,{Component} from 'react';
import './App.css';
const APIURL = "http://localhost:4000";
class App extends Component {
   constructor(props){
    super(props);
    this.state = {
        title: 'Add Contact',
        act: 0,
        index: '',
        id: '',
        datas: [],
        nameErrors: '',
        phoneErrors: ''
    }

  }

  componentDidMount(){
    this.fetchContactDetails();
    this.refs.name.focus();
  }

  fSubmit = (e) => {
      e.preventDefault();
      let datas = this.state.datas;
      if(this.refs.name.value === '' || this.refs.name.value == null){
          this.state.nameErrors = 'Please provide name';
      }

      if(this.refs.mobile_number.value === '' || this.refs.mobile_number.value == null || (!(/^(?:\+?88|0088)?01[15-9]\d{8}$/.test(this.refs.mobile_number.value)))){
          this.state.phoneErrors = 'Please provide Mobile Number';
      }

      let name = this.refs.name.value;
      let mobile_number = this.refs.mobile_number.value;
      let serverSendData = {
          name, mobile_number
      }

      // edit function calling
      if (this.state.id && (this.refs.mobile_number.value !== '' && this.refs.name.value !== '' && ((/^(?:\+?88|0088)?01[15-9]\d{8}$/.test(this.refs.mobile_number.value))))){
          this.editContactDetail(serverSendData);
      }
      // create function calling
      else if (this.refs.mobile_number.value !== '' && this.refs.name.value !== '' && ((/^(?:\+?88|0088)?01[15-9]\d{8}$/.test(this.refs.mobile_number.value)))) {
          this.createContact(serverSendData);
      }
      else {
          console.log('Error');
      }
      // reset form data here
      this.refs.myForm.reset();
      // reinitializing focus to the name input field
      this.refs.name.focus();

      this.fetchContactDetails();
  }


  createContact = async (serverSendData) => {
      const response = await fetch(`${APIURL}/create`, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(serverSendData)
      });
  }

  fetchContactDetails = () => {
    fetch(`${APIURL}/allcontacts`)
    .then(res => res.json())
    .then((data) => {
      this.setState({
          datas: data
      });
    })
    .catch(console.log)
  }

  editContactDetail = async (serverSendData) => {
      const response = await fetch(`${APIURL}/editcontact/?contactId=${this.state.id}`, {
          method: "PUT",
          mode: "cors",
          cache: "no-cache",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(serverSendData)
      });
  }

  deleteContactDetail = async (id) => {
      const response = await fetch(`${APIURL}/deletecontact/?contactId=${id}`, {
          method: "DELETE",
          mode: "cors",
          cache: "no-cache",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify()
      });
  }

  fRemove = (i, id) => {
    let datas  = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas:datas
    });
    this.deleteContactDetail(id);
    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fEdit = (i, id) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.mobile_number.value = data.mobile_number;

    this.setState({
      act: 1,
      index: i,
      id: id
    })
    this.refs.name.focus();
  }

  searchQuery = (e) => {
    let item = this.refs.query.value;
      console.log(item);
    fetch(`${APIURL}/searchcontact/?filterItem=${item}`)
    .then(res => res.json())
    .then((data) => {
      this.setState({
          datas: data
      });
    })
    .catch(console.log)
  }

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input
              type="text"
              ref="name"
              placeholder="name"
              className="formField"
          />
          {this.state.nameErrors}
          <input type="tel"
                 ref="mobile_number"
                 placeholder="mobile number"
                 className="formField"
          />
          {this.state.phoneErrors}
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Submit</button>
        </form>

        <h2>Contact List</h2>
        <div>
            <input type="text" ref="query" placeholder="search contact" className="searchbox" />
            <button onClick={(e)=>this.searchQuery(e)} className="enterbutton">Enter</button>
        </div>
        <pre className="contactList">
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {data.id}.{data.name}, {data.mobile_number}
              <button onClick={()=>this.fRemove(i, data.id)} className="myListButton">Remove</button>
              <button onClick={()=>this.fEdit(i, data.id)} className="myListButton">Edit</button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
