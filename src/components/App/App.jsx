import { Loader } from '../Loader/Loader';
import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { Button } from '../Button/Button';
import { getImages } from 'service/api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { GlobalStyle } from '../GlobalStyle';
import { AppContainer } from './App.styled';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    request: '',
    images: [],
    page: 1,
    isLoader: false,
    isModalOpen: false,
    modalImg: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.request !== this.state.request
    ) {
      try {
        this.setState({ isLoader: true });
        const result = await getImages(this.state.request, this.state.page);
        this.setState(prevState => ({
          images: [...prevState.images, ...result],
        }));
      } catch (err) {
        console.log(err);
      } finally {
        this.setState({ isLoader: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: (prevState.page += 1),
    }));
  };

  handleFormSubmit = request => {
    this.setState({ images: [], page: 1, request });
  };

  openModal = id => {
    const { images } = this.state;
    const modalUrlImg = images.find(el => el.id === Number(id)).largeImageURL;
    this.setState({ isModalOpen: true, modalImg: modalUrlImg });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, modalImg: '' });
  };

  render() {
    const { images, isLoader, isModalOpen, modalImg } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={images}
          onModal={this.openModal}
          offModal={this.closeModal}
        />
        {isLoader && <Loader />}
        {images.length > 0 && <Button handleClick={this.handleLoadMore} />}
        {isModalOpen && (
          <Modal img={modalImg} onClosseModal={this.closeModal} />
        )}
        <GlobalStyle />
      </AppContainer>
    );
  }
}
