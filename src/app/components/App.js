import React, { PropTypes } from 'react';
import Header from './common/Header';

class App extends React.Component {
  render () {
    return (
      <div className="container-fluid">
        <Header/>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
