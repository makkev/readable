
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost, fetchPostCategory, addPost, postVote, removePost, 
  listCategories } from '../actions';
import '../readable.css';

const UPVOTE  = 'upVote';
const DOWNVOTE  = 'downVote';

class Post extends Component {
  componentDidMount() {
    this.props.listCategories();
  }
  upVote(id) {
    this.props.postVote(id, { option: UPVOTE });
  }

  downVote(id) {
    this.props.postVote(id, { option: DOWNVOTE });
  }

  render() {
    const { categories } = this.props;

    return (
      <div>
        <div className="header">
          <div className="page-head">Post List</div> 
          <div className="postListMain">
            Category -&nbsp;
            <Link onClick={() => this.props.fetchPost()} 
              to={'/'}>[All] </Link>
            {categories && Object.values(categories).map((cat) => 
              <Link key={cat.name} onClick={() => this.props.fetchPostCategory(cat.path)} 
                to={`/${cat.path}`}>[{cat.name}] </Link>
            )}
            <p><Link 
              to="/post/create">Create New Post</Link></p>
          </div>
        </div>
        <ul className="theList">
          {Object.values(this.props.post).map(post => (
            <div key={post.id}>
              <li key={post.id}>
                <div key={post.id} className="title">
                  <div key={post.id}>
                    <Link key={post.id} to={`/detail/${post.id}`}>
                      {post.title}
                    </Link>
                  </div>
                </div>
                <div>by {post.author}</div>
                <div>[Category: {post.category}] [Comments: {post.commentCount}] </div>
    
                <div className="container">
                  <button className="button-vote"
                    onClick={() => this.downVote(post.id)}>-</button>
                  <span>Votes: {post.voteScore}</span>
                  <button className="button-vote"
                      onClick={() => this.upVote(post.id)}>+</button>
                </div>    
    
                <Link to={`/edit/${post.id}`}>
                  Edit Post
                </Link>
                <button onClick={() => this.props.removePost(post.id)}>Delete Post</button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { 
    post: state.post,
    categories: state.categories,
  }
}

export default connect(mapStateToProps,
  { fetchPost, fetchPostCategory, addPost, postVote, removePost, listCategories }
)(Post);