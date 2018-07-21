import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost, editPost, postVoteDetail, listComments } from '../actions';

const UPVOTE = 'upVote';
const DOWNVOTE = 'downVote';

class PostsDetail extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
    this.props.listComments(this.props.match.params.id);
  }

  renderComments() {
    return Object.values(this.props.comment).map(comment => {
      return (
        <div key={comment.id}>
          <li key={comment.id}>
            <p>{comment.body}</p>
            <p>{comment.author}</p>
            <p>{comment.voteScore}</p>
          </li>
      </div>
      )
    });
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
  upVote(id) {
    this.props.postVoteDetail(id, { option: UPVOTE });
  }

  downVote(id) {
    this.props.postVoteDetail(id, { option: DOWNVOTE });
  }
  render() {
    // console.log(this.props);
    return (
      <div className="postListMain">
        <h3>Post Details</h3>
          <div className="title">
            <p>{this.props.post.title}</p>
          </div>
          <p>by {this.props.post.author}</p>
          <p>[Category: {this.props.post.category}] [Comments: {this.props.post.commentCount}] </p>
          <p>{this.props.post.body}</p>
          <div className="container">
            <button className="buttons"
              onClick={() => this.downVote(this.props.post.id)}>-</button>
            <span>Votes: {this.props.post.voteScore}</span>
            <button className="buttons"
                onClick={() => this.upVote(this.props.post.id)}>+</button>

          </div>
          <div className="postListMain">
            <ul className="theList">
              {this.renderComments()}
            </ul>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    post: state.post,
    comment: state.comment 
  };
}

export default connect(mapStateToProps,
  { getPost, editPost, postVoteDetail, listComments })(PostsDetail);
