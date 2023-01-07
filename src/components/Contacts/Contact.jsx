import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ContactConext } from "../../context/ContactContext"
import { deleteContact } from "../../services/contactService"

const Contact = ({ data }) => {

  const { contacts, setContacts, setFilteredContacts } = useContext(ContactConext);

  const delContact = async () => {
    if (window.confirm('Are You Sure To Delete This Contact?')) {
      try {
        const { status } = await deleteContact(data.id)
        if (status == 200) {
          const currentContact = contacts.filter(x => x.id == data.id);
          contacts.splice(contacts.indexOf(currentContact), 1);
          setContacts([...contacts])
          setFilteredContacts([...contacts])
        }
      } catch {
        alert('An Error Accoured');
      }
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-4">
            <a href={data.photo} target="_blank">
              <img src={data.photo ? data.photo : 'https://via.placeholder.com/180'} className="rounded" alt={data.fullname} width="160" />
            </a>
          </div>
          <div className="col-7 ps-0">
            <ul className="list-group">
              <li className="list-group-item">
                <b className="d-inline-block text-muted" style={{ minWidth: 70 }}>Name:</b>
                <span>{data.fullname}</span>
              </li>
              <li className="list-group-item">
                <b className="d-inline-block text-muted" style={{ minWidth: 70 }}>Mobile:</b>
                <span>{data.mobile}</span>
              </li>
              <li className="list-group-item">
                <b className="d-inline-block text-muted" style={{ minWidth: 70 }}>Email:</b>
                <span>{data.email}</span>
              </li>
              <li className="list-group-item">
                <b className="d-inline-block text-muted" style={{ minWidth: 70 }}>Job:</b>
                <span>{data.job}</span>
              </li>
            </ul>
          </div>
          <div className="col-1 p-1">
            <div className="h-100 d-flex flex-column justify-content-center align-items-center">
              <Link to={`${data.id}/show`} className="btn btn-sm btn-outline-secondary mb-2">
                <FontAwesomeIcon icon={faEye} />
              </Link>
              <Link to={`${data.id}/edit`} className="btn btn-sm btn-outline-primary mb-2">
                <FontAwesomeIcon icon={faPen} />
              </Link>
              <button className="btn btn-sm btn-outline-danger" onClick={() => { delContact() }}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Contact