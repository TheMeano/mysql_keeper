import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link} from "react-router-dom";

function Header(){

    const {currentUser, logout} = useContext(AuthContext);



    return(
        <header>
            <h1>Keeper</h1>
            <div className="headerUser">
            <span>{currentUser?.username}</span>
            {currentUser? (
                <span onClick={logout}><Link className="link" to="/login">Logout</Link></span> 
            )  : (
                <div>
                    <Link style={{marginRight: "10px"}} className="link" to="/login">
                        Login
                    </Link>
                    <Link className="link" to="/register">
                        Register
                    </Link>
                </div>
            )}
            </div>
        </header>
    );
}

export default Header;