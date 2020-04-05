import React from 'react';
import { Route, Link } from 'react-router-dom';

const Cont = ({match}) => <p>{match.params.id}</p>

class Contact extends React.Component {
    onSubmit = () => {
        this.props.history.push('/');
    }

    render() {
        const { url } = this.props.match;  
        
        return (
            <div>
                <h1>Contacts</h1>
                <strong>Select contact</strong>
                <ul>
                    <li>
                        <Link to="/contact/1">Contact 1</Link>
                    </li>
                    <li>
                        <Link to="/contact/2">Contact 2</Link>
                    </li>
                    <li>
                        <Link to="/contact/3">Contact 3</Link>
                    </li>
                </ul>
                <Route path="/contact/:id" component={Cont} />
                <form>
                    <input placeholder="name" type="name" />
                    <input placeholder="email" type="email" />
                    <button onClick={this.onSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Contact