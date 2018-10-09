import {inject,observer} from 'mobx-react';
import axios from 'axios';
import React, { Component } from 'react';
import MakeGroupM from './components/MakeGroupM';
import GroupList from './components/GroupList';


@inject('groupSelect')
@observer
class MakeGroup extends Component {
  state = {
    a: 1,
    information: [

    ],
  }

  fetchGroupInfo = async () => {
    console.log("fetchGroupInfo");
    const info = await Promise.all([
      axios({
          method: 'get',
          url: 'http://localhost:8080/groups'
      }).then(response=>{console.log(response)
        this.informationConcat(response);
      }).catch(error=>{console.log(error);})
    ]);
  }

  handleCreate = () => {
    console.log("handle");
    this.fetchGroupInfo();
  }
  handlePageChange() {
     window.location.hash = "/";
   }
  informationConcat(response){
    let abc=[];
    let i=0;
    const info = response.data.groups;
    console.log(info.length);
    for(i=0;i<info.length;i++){
      abc=abc.concat([info[i]])
    }
    this.setState({
      information:abc
    })

  }
  componentWillReact(){
    console.log("componentWillReact");

  }

  constructor(props){
    super(props);
    console.log("constructor");
  }

  componentWillMount(){
      this.fetchGroupInfo();

  }
  onClick=(id)=>{
    const store =this.props.groupSelect;
   store.setGroupId(id);
   // this.handlePageChange();

 }

  render() {
    const store =this.props.groupSelect;
    console.log("MakeGroupRender");
    return (
      <div>
        <MakeGroupM onCreate={this.handleCreate}/>
        <GroupList
          onClick={this.onClick}
          data={this.state.information}
        />
      </div>
    );
  }
}

export default MakeGroup;
