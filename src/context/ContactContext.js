import { createContext } from "react";

export const ContactConext = createContext({
  loading: false,
  contacts: [],
  setContacts: () => {},
  filteredContacts: [],
  setFilteredContacts: () => {},
  setContactInfo: () => {},
  contactQuery: {},
  contactSearch: () => { },
});