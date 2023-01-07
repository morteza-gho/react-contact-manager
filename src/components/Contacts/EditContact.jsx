import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactConext } from "../../context/ContactContext";
import { getContact, getGroups, updateContact } from "../../services/contactService";

const EditContact = () => {

  const route = useParams();
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({
    fullname: '',
    mobile: '',
    email: '',
    photo: '',
    group: ''
  });

  const navigate = useNavigate();
  const {contacts, setContacts, setFilteredContacts} = useContext(ContactConext);

  const setContactInfo = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    const getData = async () => {
      const { data: groupData } = await getGroups();
      setGroups(groupData);

      const { data: contactData } = await getContact(route.id);
      setContact(contactData)
    }
    getData();
  }, [])

  const editContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status, data } = await updateContact(route.id, contact);
      if (status === 200) {
        setContact({});
        contacts[contacts.findIndex(c => c.id == route.id)] = data;
        setContacts([...contacts]);
        setFilteredContacts([...contacts]);
        navigate('/contacts');
      }
    } catch {
      alert('An Error Accourd');
    }
  }

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-2">
          <img src={contact.photo ? contact.photo : 'https://via.placeholder.com/180'} className="rounded" alt='' width="160" />
        </div>
        <div className="col-4">
          <form onSubmit={editContactForm}>
            <div className="mb-3">
              <label className="form-label">Fullname</label>
              <input type="text"
                className="form-control"
                name="fullname"
                value={contact.fullname}
                onChange={setContactInfo}
                placeholder="Enter Fullname"
                required={true} />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile</label>
              <input type="tel"
                className="form-control"
                name="mobile"
                value={contact.mobile}
                onChange={setContactInfo}
                placeholder="Enter Mobile"
                required={true} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email"
                className="form-control"
                name="email"
                value={contact.email}
                onChange={setContactInfo}
                placeholder="Enter Email Address"
                required={true} />
            </div>
            <div className="mb-3">
              <label className="form-label">Job</label>
              <input type="text"
                className="form-control"
                name="job"
                value={contact.job}
                onChange={setContactInfo}
                placeholder="Enter text"
                required={true} />
            </div>
            <div className="mb-3">
              <label className="form-label">Photo Address</label>
              <input type="url"
                className="form-control"
                name="photo"
                value={contact.photo}
                onChange={setContactInfo}
                placeholder="Enter Photo Address"
                required={true} />
            </div>
            <div className="mb-3">
              <label className="form-label">Group</label>
              <select
                className="form-select"
                name="group"
                value={contact.group}
                onChange={setContactInfo}
                required={true}>
                <option value="" defaultValue>Select Group</option>
                {
                  groups.length && groups.map(item => (
                    <option value={item.id} key={item.id}>{item.name}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <button className="btn btn-success">
                <FontAwesomeIcon icon={faCheck} />
                {' '} Update
              </button>
              {' '}
              <Link to='/contacts' className="btn btn-outline-secondary">
                <FontAwesomeIcon icon={faClose} />
                {' '} Cancel
              </Link>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}
export default EditContact;