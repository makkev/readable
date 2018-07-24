import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost, listCategories } from '../actions';
import { Link } from 'react-router-dom';

class PostsCreate extends Component {
  componentDidMount() {
    this.props.listCategories();
  }
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
    const { categories } = this.props;
    return (
      <div className="postListMain">
        <div className="page-head">
            <Link to="/">Readable</Link>
            &nbsp;- Create Post
        </div>
        <p></p>
        <form>
          <div>Title</div>
          <div><input ref={(a) => this._inputTitle = a} type="text" placeholder="Title" /></div>
          <p></p>
          <div>Body:</div>
          <div><textarea ref={(a) => this._inputBody = a} name="Text1" cols="40" rows="5" placeholder="Body"></textarea></div>
          <p></p>
          <div>Author:</div>
          <div><input ref={(a) => this._inputAuthor = a} type="text" placeholder="Author" /></div>
          <p></p>
          <div> Category:</div>
          <div>
            <select ref={(a) => this._inputCategory = a} name="category" id="category">
              {categories && Object.values(categories).map((cat) => 
                <option key={cat.path} value={cat.path}>{cat.path}</option>

              )}
            </select>
          </div>
          <p></p>
          <button type="button" onClick={(a) => this.createPost()}>Save</button>
          <button type="button" onClick={(a) => window.location.assign('/')}>Cancel</button>

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    categories: state.categories,
  }
}

export default connect(mapStateToProps, { addPost, listCategories })(PostsCreate);