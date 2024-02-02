import React, { useEffect, useState } from 'react';

const DetailsPage = ({ selectedMovieId }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://www.omdbapi.com/?apikey=4d94a812&i=${selectedMovieId}`);
        const data = await response.json();

        if (data.Response === 'True') {
          setMovieDetails(data);
        } else {
          console.error('Error fetching movie details:', data.Error);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedMovieId) {
      fetchMovieDetails();
    }
  }, [selectedMovieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const { Title, Year, Poster, Type } = movieDetails;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Movie Details</h2>
      <table style={{ margin: 'auto' }}>
        <tbody>
          <TableRow label="Title" value={Title} />
          <TableRow label="Year" value={Year} />
          <TableRow label="Poster" value={<PosterImage src={Poster} alt={Title} />} />
          <TableRow label="Type" value={Type} />
        </tbody>
      </table>
    </div>
  );
};

const TableRow = ({ label, value }) => (
  <tr>
    <th>{label}</th>
    <td>{value}</td>
  </tr>
);

const PosterImage = ({ src, alt }) => (
  src && <img src={src} alt={alt} style={{ maxWidth: '100%' }} />
);

export default DetailsPage;
