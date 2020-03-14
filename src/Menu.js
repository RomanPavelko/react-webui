import React from 'react'
import MenuItem from './MenuItem'

class Menu extends React.Component{
    render(){
        return(
            <div>
                <div className="Menu-header"> 
                    <a href="/">React App</a>
                </div>
                <hr></hr>
                {this.renderMenuItem(1)}
                {this.renderMenuItem(2)}
                {this.renderMenuItem(3)}
                {this.renderMenuItem(4)}
                {this.renderMenuItem(5)}                
            </div>
        )
    }

    renderMenuItem(i){
        return <MenuItem 
            value={i} 
            getClass={this.props.activePage === i ? 'active' : ''} 
            onClick={() => this.props.setPage(i)} />
    }
}

export default Menu