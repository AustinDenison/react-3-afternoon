import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import {toast} from 'react-toastify'
import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`https://practiceapi.devmountain.com/api/posts`).then(res => {
      console.log('res', res)
      toast.success('good')
      this.setState({
        posts: res.data
      })
    })
    .catch(err => {toast.error('bad')})
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text}).then(res => {
      toast.success('you good homie')
      this.setState({
        posts: res.data
      })
    })
    .catch(err => {toast.error('bad boi')})
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text}).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  render() {
    const { posts } = this.state;
    const {text, date} = this.props;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>

          {
            posts.map( post => (<Post key={post.id} 
              text={post.text} 
              date={post.date} 
              id={post.id} 
              updatePostFn={this.updatePost} 
              deletePostFn={this.deletePost}
              />))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
