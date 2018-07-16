import React, { Component } from 'react';
import * as PostsAPI from '../utils/PostsAPI';
import { addPost } from '../actions';

class PostsList extends Component {

  // state = {
  //   posts: [],
  // };

  // componentDidMount() {
  //   PostsAPI.getAll().then((posts) => {
  //     this.setState({ posts });
  //   });
  // }

  state = {
    posts: null
  };

  componentDidMount() {
    const { store } = this.props;

    store.subscribe(() => {
      this.setState(() => ({
        posts: store.getState() 
      }));
    });
  }

  submitPost = () => {
    this.props.store.dispatch(addPost ({
      author: 'AM',
      body: 'this is the body 2',
      category: 'javascript',
      commentCount: '3',
      title: this.input.value,

    }));
    this.input.value = '';
  }
  
  render() {
    console.log(this.state);
    return (
      <div>
        <input 
          type="text"
          ref={(input) => this.input = input}
          placeholder="Post"
        />
        <button onClick={this.submitPost}>Submit</button>
      </div>
    );
  }
}

export default PostsList;