import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';
const { useState } = require('react');

export const Searchbar = ({ onSubmit }) => {
  const [request, setRequest] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (request.trim() === '') {
      console.log('Введите название картинки');
      return;
    }
    onSubmit(request);
    setRequest('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          value={request}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setRequest(e.currentTarget.value.toLowerCase())}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
