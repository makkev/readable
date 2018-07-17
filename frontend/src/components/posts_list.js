import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return Object.values(this.props.posts).map(post => {
      return (
        <li key={post.id}>
          {post.title}
        </li>
      )
    });

  }
  render() {
    return (
      <div>
       <h3>Posts</h3> 
       <ul>
        {this.renderPosts()}
       </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsList);