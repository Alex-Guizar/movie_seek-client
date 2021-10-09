// Packages
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// React-Bootstrap Components
import Col from 'react-bootstrap/Col';

// Custom Components
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <>
    <Col md={12} style={{ margin: '1em' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    {filteredMovies.map(m => (
      <Col className="mt-3" sm={6} md={4} lg={3} key={m._id}>
        <MovieCard movie={m} />
      </Col>
    ))}
  </>;
}

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(MoviesList);