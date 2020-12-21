import React, { Fragment } from "react"
import { NavLink } from "react-router-dom"
import Signout from "../components/Auth/Signout"

const Navbar = ({ session }) => (
    <header>
        <nav className="fixed shadow-sm w-full flex justify-between p-6">
            {session && session.getCurrentUser ? (
                <NavbarAuth session={session} />
            ) : (
                <NavbarUnAuth />
            )}
        </nav>
    </header>
)

const NavbarAuth = ({ session }) => (
    <Fragment>
        <ul className="flex-1 flex justify-end space-x-4 text-xs uppercase">
            <li className="">
                <NavLink to="/" exact>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/search">Search</NavLink>
            </li>
            <li>
                <NavLink to="/recipe/add">Add Recipe</NavLink>
            </li>
            <li>
                <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
                <Signout />
            </li>
            <li>
                <h2>Welcome, {session.getCurrentUser.username}</h2>
            </li>
        </ul>
    </Fragment>
)

const NavbarUnAuth = () => (
    <ul className="flex-1 flex justify-end space-x-4 text-xs uppercase">
        <li>
            <NavLink to="/" exact>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/search">Search</NavLink>
        </li>
        <li>
            <NavLink to="/signin">Signin</NavLink>
        </li>
        <li>
            <NavLink to="/signup">Signup</NavLink>
        </li>
    </ul>
)

export default Navbar
