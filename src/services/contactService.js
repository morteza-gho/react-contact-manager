import axios from "axios";

const BASE_URL = 'http://localhost:9000';

// get all contacts
export const getContacts = () => {
  const url = `${BASE_URL}/contacts`;
  return axios.get(url);
}

// get contact data
export const getContact = (id) => {
  const url = `${BASE_URL}/contacts/${id}`
  return axios.get(url);
}

// get all groups
export const getGroups = () => {
  const url = `${BASE_URL}/groups`
  return axios.get(url);
}

// get group data
export const getGroup = (id) => {
  const url = `${BASE_URL}/groups/${id}`
  return axios.get(url);
}

// create new contact
export const createContact = (data) => {
  const url = `${BASE_URL}/contacts`
  return axios.post(url, data);
}

// update contact
export const updateContact = (id, data) => {
  const url = `${BASE_URL}/contacts/${id}`
  return axios.put(url, data);
}

// delete contact
export const deleteContact = (id) => {
  const url = `${BASE_URL}/contacts/${id}`
  return axios.delete(url);
}

