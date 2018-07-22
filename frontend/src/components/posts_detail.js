import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Comments from './comments';
import { getPost, editPost, postVoteDetail, listComments, postComment, removeComment, editComment } from '../actions';

const UPVOTE = 'upVote';
const DOWNVOTE = 'downVote';


class PostsDetail extends Component {

  state = {
    showNewComment: false,
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
    this.props.listComments(this.props.match.params.id);
  }

  renderNewComment = () => {
    this.setState({ showNewComment: true });
  }

  unrenderNewComment = () => {
    this.setState({ showNewComment: false });
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
          <button className="buttons" onClick={(a) => this.renderNewComment() }>Add Comments</button>

          {this.state.showNewComment ? 
            <NewComment 
              unrenderNewComment={this.unrenderNewComment} 
              postComment={this.props.postComment}
              postId={this.props.post.id}
            /> : null}

          <Comments 
            comments={this.props.comment}
            removeComment={this.props.removeComment}
            editComment={this.props.editComment}
          />


      </div>
    );
  };
}

class Comments extends Component {
  state = {
    currentEditId: null,
  }

  setEditingId = (val) => this.setState({ currentEditId: val })

  saveComment = (id, comment) => {
    this.props.editComment(id, comment);
    this.setEditingId(null);
  }

  render() {
    return (
      <div className="postListMain">
        <ul className="theList">
          {Object.values(this.props.comments).map(comment => (
            <li key={comment.id}>
              {comment.id == this.state.currentEditId ? 
                <div>
                  <p><input type="text" ref={(a) => this.body = a} defaultValue={comment.body} autoFocus /></p>
                  <div>by {comment.author}</div>
                  <button onClick={() => this.saveComment(comment.id, this.body.value)} >Save</button>
                  <button onClick={() => this.setEditingId(null)} >Cancel</button>
                </div>
                :
                <div>
                  <div>{comment.body}</div>
                  <div>by {comment.author}</div>
                  <div>{comment.voteScore}</div>
                  <button onClick={() => this.props.removeComment(comment.id)} class="button-delete">Delete</button>
                  <button onClick={() => this.setEditingId(comment.id)} >Edit</button>
                </div>
              }
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class NewComment extends Component {
  postComment = () => {
    this.props.postComment({ 
      body: this.comment.value,
      author: this.author.value,
      parentId: this.props.postId,
    });
    this.props.unrenderNewComment()

  }
  render() {
    return (
      <div>
        <ul className="theList">
          <li>
            <p>Comment:</p>
            <p>
              <input ref={(a) => this.comment = a}
                type="text" placeholder="Comment" autoFocus
              />
            </p>
            <p> Author:</p>
            <p>
              <input ref={(a) => this.author = a}
                type="text" placeholder="Author"
              />
            </p>
            <button onClick={() => this.postComment()}>Save</button>
            <button onClick={() => this.props.unrenderNewComment()}>Cancel</button>
          </li>
        </ul>
      </div>
    );
  };
} 

function mapStateToProps(state) {
  return { 
    post: state.post,
    comment: state.comment 
  };
}

export default connect(mapStateToProps,
  { getPost, editPost, postVoteDetail, listComments, postComment, removeComment, editComment  })(PostsDetail);

