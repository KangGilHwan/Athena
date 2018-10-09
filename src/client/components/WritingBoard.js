
import axios from 'axios';
import React, { Component } from 'react';

class WritingBoard extends Component {
  state = {
    contents: '',
    title: '',
  }
    //async함수로 동기화시켜준다
    handleSubmit = async (e) => {
      // 페이지 새로고침방지
      e.preventDefault();
      //a는 성공여부확인
      var a = 1;
      const groupSelect = this.props.groupSelect;

      await axios.post('http://localhost:8080/groups/'+groupSelect+'/boards',{
        contents : this.state.contents,
        title : this.state.title,
      })
      .then(function success(response){
        console.log("success");
        console.log(response.data);

      }).catch(function b(error){
        console.log("error");
        console.log(error);
        this.a=2;
      })
      if(a===1){
        this.props.onCreate();
        this.setState({
          contents: '',
          title : '',
        })
      }
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });

    }


  render() {
    const groupSelect = this.props.groupSelect;
    console.log("WritingBoard의" + groupSelect);
    return (
      <div>

        <form onSubmit={this.handleSubmit}>
          <h1>Athena</h1>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
            placeholder="Title"
            type="text"

          /><br></br>
          <textarea
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            cols={50}
            name="contents"
            name="contents"
            onChange={this.handleChange}
            value={this.state.contents}
            placeholder="Content"
            rows={8}

          />
        <button type="submit">글작성</button>
        </form>



      </div>
    );
  }
}

export default WritingBoard;
