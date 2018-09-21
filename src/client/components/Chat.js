
import * as React from 'react';
import io from "socket.io-client";

class Chat extends React.Component{

  constructor(props){
        super(props);
        this.socket = io('http://localhost:8080', {transports: ['websocket'], query : { nickname : 'kang'}});
        // this.socket = io('http://localhost:8080', {query : { nickname : 'kang'}});
        console.log("create");
        this.socket.on("room", (data) => {
          console.log(`room massage : ${data}`);
        });
    }

  state={messageContent : null,}
  setMessageContent =(messageContent)=>{
      this.setState({
        messageContent:messageContent,
      });
      console.log(messageContent);
  }

  joinRoom = () => {
    return new Promise((resolve, reject) => {
      this.socket.emit("joinRoom", { roomId : 2 });
      this.socket.on("room", (data)=> {
        console.log(`room data ${data}`);
      })
      resolve();
    })
  }

  submit=(e)=>{
    e.preventDefault();
    console.log("create2");
    this.socket.emit("createRoom", { name : "codesquad" });
    this.socket.emit("joinRoom", { roomId : 2 });
    this.socket.emit("message", { roomId : 3 , message : "Hi" });
    console.log("submit");
  }
render(){
    return(
      <div>
      <h1>채팅창</h1>
      <form onSubmit={this.submit}>
        <input type='text'
        placeholder='메세지를 입력하세요.'
        onChange={e => this.setMessageContent(e.target.value)}
        value={this.state.messageContents}
        />
        <input type='submit' value='메세지 전송'/>
      </form>
      </div>
    );
  }
}
export default Chat;
