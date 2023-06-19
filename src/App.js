import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  name = "Mayank"
  pageSize = 9;
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress: 10
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={4}
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path='/' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path='/general' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path='/sports' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path='/science' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path='/technology' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
            <Route exact path='/entertainment' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path='/health' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path='/business' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business" />} />
          </Routes >
        </Router >
      </>
    )
  }
}
