import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost, createPost } from '../actions';

class PostsCreate extends Component {
  createPost(e) {
    const thePost = {
      title: this._inputTitle.value,
      body: this._inputBody.value,
      author: this._inputAuthor.value,
      category: this._inputCategory.value,
    }
    this.props.addPost(thePost);
  }
  render() {
    return (
      <div>
        <h3>Post Create</h3>
        <form>
          <p>
            Title: 
            <input  ref={(a) => this._inputTitle = a}
              type="text" placeholder="Title" />
          </p>
          <p>
            Body: 
            <input ref={(a) => this._inputBody = a}
              type="text" placeholder="Body" />
          </p>
          <p>
            Author: 
            <input ref={(a) => this._inputAuthor = a}
              type="text" placeholder="Author" />
          </p>
          <p>
            Category: 
            <select ref={(a) => this._inputCategory = a} name="category" id="category">
              <option value="react">react</option>
              <option value="redux">redux</option>
              <option value="udactiy">udacity</option>
            </select>
          </p>
          <button type="button" onClick={(a) => this.createPost()}>add</button>

        </form>
      </div>
    );
  }
}

export default connect(null, { addPost })(PostsCreate);