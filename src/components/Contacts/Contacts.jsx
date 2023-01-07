import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ContactConext } from "../../context/ContactContext";
import { deleteContact } from "../../services/contactService";
import NotFoundItems from "../General/NotFoundItems"
import Contact from "./Contact"

export const Contacts = () => {

  const {loading, filteredContacts} = useContext(ContactConext);

  return (
    <>
      <Link to='add' className="btn btn-primary mb-3">
        <FontAwesomeIcon icon={faPlus} />
        {' '}Add New Contact
      </Link>

      {loading ? <div>Loading...</div> :
        filteredContacts.length ?
          <div className="row">
            {
              filteredContacts.map((item) => {
                return (
                  <div className="col-6 mb-4" key={item.id}>
                    <Contact data={item} />
                  </div>
                )
              })
            }
          </div>
          : <NotFoundItems />
      }
    </>
  )
}

export default Contacts