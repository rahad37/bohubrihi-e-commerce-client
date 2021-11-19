import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout, userInfo } from '../utils/auth';

const isActive = (history, path) => {
    if(history.location.pathname === path){
        return {color: '#ff9900'}
    }else{
        return {color: 'grey'}
    }
}

const Menu = ({history}) => {
    return (
        <nav className='navbar navbar-dark bg-dark'>
            <ul className="nav nav-tabs" >
                <li className="nav-item">
                    <Link to='/' style={isActive(history, '/')} className="nav-link">Home</Link>
                </li>
                {!isAuthenticated() && (<>
                <li className="nav-item">
                    <Link to='/login' style={isActive(history, '/login')} className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to='/register' style={isActive(history, '/register')} className="nav-link">Register</Link>
                </li>
                </>)}

                {isAuthenticated() && (<>
                <li className="nav-item">
                    <Link to={`/${userInfo().role}/dashboard`} style={isActive(history, `/${userInfo().role}/dashboard`)} className="nav-link">Dashboard</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, `/cart`)} to={`/cart`}>Cart</Link>
                </li>

                <li className="nav-item">
                    <span className="nav-link" style={{cursor: 'pointer', color: 'grey'}} onClick={()=>{
                        signout(() => {
                            history.push('/login')
                        });
                    }}>Log Out</span>
                </li>
                </>)}
            </ul>
        </nav>
    )
}

export default withRouter(Menu);