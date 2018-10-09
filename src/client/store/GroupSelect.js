import {action,computed,observable} from 'mobx';
import { Redirect } from 'react-router-dom';

class GroupSelect{
  @observable
  groupId = 'tototodos';

  @action
  setGroupId = (groupId)=>{
    this.groupId=groupId
  }
  @action
  getGroupId = () =>{
    return this.groupId
  }
}
export default GroupSelect;
