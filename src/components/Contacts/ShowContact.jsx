import { faChevronLeft, faCircleLeft, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteContact, getContact } from "../../services/contactService";

const ShowContact = () => {

  const route = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const { data: contactData } = await getContact(route.id);
      setData(contactData)
    }
    getData();
  }, []);

  const delContact = async () => {
    if (window.confirm('Are You Sure To Delete This Contact?')) {
      try {
        const { status } = await deleteContact(route.id)
        if (status == 200)
          navigate('/contacts');
      } catch {
        alert('An Error Accoured');
      }
    }
  }

  return (
    <>
      {data &&
        <div className="card w-50">
          <div className="card-body">
            <h1 className="mb-3">User Details</h1>
            <div className="row">
              <div className="col-4">
                <a href={data.photo} target="_blank">
                  <img src={data.photo} className="rounded" alt={data.fullname} width="160" />
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
                  <Link to="/contacts" className="btn btn-sm btn-outline-secondary mb-2" title="Back">
                    <FontAwesomeIcon icon={faCircleLeft} />
                  </Link>
                  <Link to={`/contacts/${data.id}/edit`} className="btn btn-sm btn-outline-primary mb-2">
                    <FontAwesomeIcon icon={faPen} />
                  </Link>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => delContact()}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
export default ShowContact;