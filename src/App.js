import React from 'react';
import Menu from './Menu'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'
import Page5 from './Page5'
import Progressbar from './js/components/progressbar'
import SnackbarSuccess from './js/components/snackbarSuccess'
import SnackbarError from './js/components/snackbarError'
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activePage: 1
    };
  }

  render(){
    return (
      <div className="App">
        <SnackbarSuccess />
        <SnackbarError />
        <Progressbar />

        <div className="App-body">
          <div className="App-menu">
            <Menu 
              activePage={this.state.activePage} 
              setPage={(i) => this.setPage(i)} />
          </div>
          <div className="App-content">
            { this.renderPage() }
          </div>
        </div>
        
      </div>
    );
  }

  renderPage(){
    switch(this.state.activePage){
      case 1:
        return <Page1 />;
      case 2:
        return <Page2 />;
      case 3:
        return <Page3 />;
      case 4:
        return <Page4 />;
      case 5:
        return <Page5 />;
      default:
        return <Page1 />
    }
  }
  
  setPage(i){
    this.setState({
        activePage: i
    });
  }
}

export default App;