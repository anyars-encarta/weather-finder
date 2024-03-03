import PropTypes from 'prop-types';

const Search = ({ search, setSearch, handleSearch }) => (
  <div className="search-engine">
    <input
      type="text"
      placeholder="Search for a city"
      name="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <button type="button" onClick={handleSearch}>Search Weather</button>
  </div>
);

Search.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.string.isRequired,
  handleSearch: PropTypes.string.isRequired,
};

export default Search;
