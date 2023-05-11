import React from "react";
import Modal from 'react-modal';
import '../Styles/header.css';


const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.9)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModal: false
        }
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    handleLogout = () => {
        window.open("http://localhost:5500/auth/login/logout", "_self");
    }

    google = () => {
        window.open("http://localhost:5500/auth/google", "_self");
    }

    render() {
        const { loginModal } = this.state;
        const {user} = this.props;

        return(
            <div>
                <nav class="navbar bg-danger" data-bs-theme="">
                    <div class="container">
                        <div class="navbar-brand text-danger circle">
                            <h2 class="logo">e!</h2>
                        </div>{console.log(user)}
                        { !user ? (
                            <form class="d-flex nav-form">
                                <button type="button" class="btn btn-danger"
                                    onClick={() => this.handleModal('loginModal', true)}>Login</button>
                                <button type="button" class="btn btn-outline-light">Create an account</button>
                            </form>
                        ) : (
                            <form class="d-flex nav-form">
                                <img style={{height: "40px", width: "40px"}} className="img-thumbnail circle" src={user.photos[0].value} alt="Avatar" />
                                <a className="text-white p-2" >{user.displayName}</a>
                                <button type="button" class="btn btn-danger"
                                    onClick={this.handleLogout} >LogOut</button>
                            </form>
                        )

                        }
                        
                    </div>
                </nav>
                <Modal
                isOpen={loginModal}
                style={customStyles}
                >
                <div style={{float: "right", marginTop: "-21px"}} onClick={() => this.handleModal('galleryModal', false)}>
                    <i class="bi bi-x-circle-fill"></i>
                </div>
                <div className="body">
                <form id="form" itemID="container" method="POST">
                        <h1 className="h1">Login</h1>
                        <input autoComplete="off" id="username" className="input" type="text" placeholder="Username"/>
                        <input autoComplete="off" id="password" className="input" type="password" placeholder="Password"/>
                        <button type="submit" className="btn-log">Log in</button>
                    </form>
                </div>

                <div onClick={this.google}>
                <p>Don't have an account? Sign Up</p>
                    <i className="bi bi-google p-2"></i> GOOGLE
                </div>
                    
                </Modal>
            </div>
        )
    }
}
export default Header;