import { useContext } from "react"
import { ContactConext } from "../../context/ContactContext"

const HeaderSearch = () => {
  const {contactQuery, contactSearch} = useContext(ContactConext);
  return (
    <form className="d-flex" role="search">
      <input
        className="form-control me-2"
        type="search"
        value={contactQuery.text}
        onChange={contactSearch}
        placeholder="Search"
      />
      <button className="btn btn-outline-warning" type="submit">Search</button>
    </form>
  )
}

export default HeaderSearch