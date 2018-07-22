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
    window.location.assign('/');
  }
  render() {
    return (
      <div className="postListMain">
        <h3>Post Create</h3>
        <form>
          <p>
            <div>Title</div>
            <div><input ref={(a) => this._inputTitle = a} type="text" placeholder="Title" /></div>
          </p>
          <p>
            <div>Body:</div>
            <div><textarea ref={(a) => this._inputBody = a} name="Text1" cols="40" rows="5" placeholder="Body"></textarea></div>
          </p>
          <p>
            <div>Author:</div>
            <div><input ref={(a) => this._inputAuthor = a} type="text" placeholder="Author" /></div>
          </p>
          <p>
            <div> Category:</div>
            <div>
              <select ref={(a) => this._inputCategory = a} name="category" id="category">
                <option value="react">react</option>
                <option value="redux">redux</option>
                <option value="udactiy">udacity</option>
              </select>
            </div>
          </p>
          <button type="button" onClick={(a) => this.createPost()}>add</button>

        </form>
      </div>
    );
  }
}

export default connect(null, { addPost })(PostsCreate);