import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/documents')
      .then(response => {
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the documents!', error);
        setError('Failed to load documents.');
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Sidebar */}
      <nav className="sidebar">
        <ul className="nav-list">
          <li><a href="#book-venue">Book Venue</a></li>
          <li><a href="#booking-history">Booking History</a></li>
          <li><a href="#contact-admin">Contact Admin</a></li>
          <li><a href="#my-details" className="my-details">My Details</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content">
        <h1>Venues</h1>
        <div className="document-container">
          {documents.length === 0 ? (
            <p>No documents found.</p>
          ) : (
            documents.map(doc => (
              <div key={doc._id} className="document-block">
                <a href={doc.space_url} target="_blank" rel="noopener noreferrer">
                  <h2>{doc.venue_name}</h2>
                  <p>{doc.space_name}</p>
                  <p>{doc.address}</p>
                  <p>{doc.nearest_tube_station}</p>
                  <p>Max Seated: {doc.max_seated}</p>
                  <p>Max Standing: {doc.max_standing}</p>
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
