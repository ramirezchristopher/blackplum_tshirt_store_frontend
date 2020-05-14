import React, { Component } from 'react';

/* Style */
import './index.css';

class Loading extends Component {
  
  render() {

    return (   

      <div className="LoadingContainer">
        <img src={process.env.REACT_APP_ICON_LOADING_GIF} className="LoadingIcon" alt="Loading..." />
      </div>

    );
  }
}

export default Loading;
