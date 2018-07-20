import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost, editPost } from '../actions';

class PostsEdit extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  editPost(e) {
    const thePost = {
      id: this.props.match.params.id,
      title: this._inputTitle.value,
      body: this._inputBody.value,
    }
    this.props.editPost(thePost);
    window.location.assign('/');
  }
  render() {
    return (
      <div className="postListMain">
        <h3>Edit Post</h3>
        <form>
          <p>
            Title: 
            <input key={this.props.post.id}
              ref={(a) => this._inputTitle = a}
              type="text" placeholder="Title" 
              defaultValue={this.props.post.title} />
          </p>
          <p>
            Body: 
            <input key={this.props.post.id}
              ref={(a) => this._inputBody = a}
              type="text" placeholder="Body"
              defaultValue={this.props.post.body} />
          </p>
          <p>
            Author: {this.props.post.author}
          </p>
          <p>
            Category: {this.props.post.category}
          </p>
          <button type="button" onClick={(a) => this.editPost()}>Save</button>

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.post };
}

export default connect(mapStateToProps, { getPost, editPost  })(PostsEdit);