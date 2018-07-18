import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions';

class PostsCreate extends Component {
  render() {
    // console.log(this.props);
    const thePost = {
      title: 'test',
      body: 'testbody',
      author: 'makky',
      category: 'react',
    }
    this.props.addPost(thePost);
    return (
      <div>
        <h3>Post Create</h3>
        <form>
          <p>Title: <input type="text" placeholder="Title" /></p>
          <p>Body: <input type="text" placeholder="Body" /></p>
          <p>Author: <input type="text" placeholder="Author" /></p>
          <p>
            Category: 
            <select name="category" id="category">
              <option value="react">react</option>
              <option value="redux">redux</option>
              <option value="udactiy">udacity</option>
            </select>
          </p>

        </form>
      </div>
    );
  }
}

export default connect(null, { addPost })(PostsCreate);