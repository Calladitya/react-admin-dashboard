
import { useEffect, useState } from 'react';


import {
  Phone,
  MessageCircle,
  Video,
  EllipsisVertical,
  Search,
  X,
  LoaderCircle
} from 'lucide-react';

import './Contact_card.css';

function Contact_card() {

  const [activeMenuId, setActiveMenuId] = useState(null);
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  useEffect(() => {
    const trimmedSearch = search.trim();

    if (trimmedSearch === appliedSearch) {
      return undefined;
    }
    const timeoutId = window.setTimeout(() => {
      setAppliedSearch(trimmedSearch);
    }, 550);

    return () => window.clearTimeout(timeoutId);
  }, [search, appliedSearch]);

  const isSearching = search.trim() !== appliedSearch;
  const contacts = [
    { id: 1, name: 'Jakob Gouse', company: 'Highspeed Inc.', image: 12 },
    { id: 2, name: 'Gretchen Aminoff', company: 'Redblue Studios', image: 47 },
    { id: 3, name: 'Davis Siphron', company: 'Beep Beep Inc.', image: 33 },
    { id: 4, name: 'Zaire Lubin', company: 'Highspeed Inc.', image: 68 },
    { id: 5, name: 'Miracle Rosser', company: 'Zero Two Studios', image: 44 },
    { id: 6, name: 'Ann Baptista', company: 'Zero Two Studios', image: 49 },
    { id: 7, name: 'Charlie Dokidis', company: 'Maximize Team', image: 52 },
    { id: 8, name: 'Carla Levin', company: 'Zero Two Studios', image: 25 }
  ];

  const filteredSearch = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(appliedSearch.toLowerCase()) ||
    contact.company.toLowerCase().includes(appliedSearch.toLowerCase())
  );

  return (
    <section className="Contact_list">
      <div className="Contact_search">
        <Search className="Contact_search-icon" size={18} aria-hidden="true" />
        <input
          type="search"
          placeholder="Search contacts or companies"
          aria-label="Search contacts or companies"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {search && (
          <button
            className="Contact_clear-search"
            type="button"
            aria-label="Clear search"
            onClick={() => setSearch('')}
          >
            <X size={17} />
          </button>
        )}
      </div>

      <button className="Add_Contact" type="button">
        + NEW CONTACT
      </button>

      <div className="Contact_results" aria-busy={isSearching}>
        <div className="Contact_results-heading">
          <h2>All contacts</h2>
          <span>
            {isSearching
              ? 'Searching...'
              : `${filteredSearch.length} ${filteredSearch.length === 1 ? 'contact' : 'contacts'}`}
          </span>
        </div>

        {isSearching ? (
          <>
            <p className="Contact_search-status" role="status">
              <LoaderCircle size={16} aria-hidden="true" />
              Searching contacts for “{search.trim()}”
            </p>
            <div className="Contact_grid Contact_grid-loading" aria-hidden="true">
              {Array.from({ length: 4 }, (_, index) => (
                <div className="Contact_skeleton-card" key={index}>
                  <span className="Contact_skeleton-menu" />
                  <span className="Contact_skeleton-avatar" />
                  <span className="Contact_skeleton-name" />
                  <span className="Contact_skeleton-company" />
                  <span className="Contact_skeleton-actions" />
                </div>
              ))}
            </div>
          </>
        ) : filteredSearch.length > 0 ? (
          <div className="Contact_grid">
            {filteredSearch.map((contact) => (
              <div className="Contacts" key={contact.id}>
                <button
                  className="Contact_menu"
                  type="button"
                  aria-label={`More options for ${contact.name}`}
                  onClick={() =>
                    setActiveMenuId(
                      activeMenuId === contact.id ? null : contact.id
                    )
                  }
                >
                  <EllipsisVertical />
                </button>

                {activeMenuId === contact.id && (
                  <div className="Contact_dropdown">
                    <button
                      type="button"
                      onClick={() => {
                        console.log('Delete clicked:', contact.id);
                        setActiveMenuId(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}

                <div className="Contact_avatar">
                  <img
                    src={`https://i.pravatar.cc/180?img=${contact.image}`}
                    alt={contact.name}
                  />
                  <span className="Contact_status"></span>
                </div>

                <div className="Name">
                  <h1>{contact.name}</h1>
                  <p>{contact.company}</p>
                </div>

                <ul className="Contact_actions">
                  <li>
                    <button type="button" aria-label={`Call ${contact.name}`}>
                      <Phone />
                    </button>
                  </li>
                  <li>
                    <button type="button" aria-label={`Message ${contact.name}`}>
                      <MessageCircle />
                    </button>
                  </li>
                  <li>
                    <button type="button" aria-label={`Video call ${contact.name}`}>
                      <Video />
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="Contact_empty-state">
            <span className="Contact_empty-icon">
              <Search size={22} aria-hidden="true" />
            </span>
            <h3>No contacts found</h3>
            <p>Try a different name or company.</p>
            <button type="button" onClick={() => setSearch('')}>
              Clear search
            </button>
          </div>
        )}
      </div>
      

    </section>
  );
}

export default Contact_card;
