import { Link, useLocation } from "react-router-dom"
import HeaderSearch from "./HeaderSearch"

const Navbar = () => {
  const locateion = useLocation();

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark mb-5">
      <div className="container">
        <a className="navbar-brand" href="#">Contacts Manager</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <Link to="contacts" className="nav-link" href="#">Contacts</Link>
            </li>
          </ul>
          {locateion.pathname === '/contacts' ? <HeaderSearch /> : null}
        </div>
      </div>
    </nav>
  )

}

export default Navbar