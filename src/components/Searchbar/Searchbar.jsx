import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';
const { Component } = require('react');

export class Searchbar extends Component {
  state = {
    request: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleRequestChange = e => {
    this.setState({ request: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.request.trim() === '') {
      console.log('Введите название картинки');
      return;
    }
    this.props.onSubmit(this.state.request);
    this.reset();
  };

  reset = () => {
    this.setState({ request: '' });
  };

  render() {
    const { request } = this.state;

    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            value={request}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleRequestChange}
          />
        </SearchForm>
      </Header>
    );
  }
}
