import { useState, useEffect } from 'react';
import { Loader } from '../Loader/Loader';
import { Searchbar } from '../Searchbar/Searchbar';
import { Button } from '../Button/Button';
import { getImages } from 'service/api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { GlobalStyle } from '../GlobalStyle';
import { AppContainer } from './App.styled';
import { Modal } from 'components/Modal/Modal';

export const App = () => {
  const [request, setRequest] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoader, setIsLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {
    if (request === '') {
      return;
    }

    setIsLoader(l => (l = true));
    getImages(request, page)
      .then(r => {
        setImages(i => [...i, ...r]);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoader(l => (l = false)));

  }, [request, page]);

  const handleLoadMore = () => setPage(p => p + 1);

  const handleFormSubmit = request => {
    setImages([]);
    setPage(1);
    setRequest(request);
  };

  const openModal = id => {
    const modalUrlImg = images.find(el => el.id === Number(id)).largeImageURL;
    setModalImg(modalUrlImg);
    setIsModalOpen(m => (m = true));
  };

  const closeModal = () => {
    setModalImg('');
    setIsModalOpen(m => (m = false));
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onModal={openModal} offModal={closeModal} />
      {isLoader && <Loader />}
      {images.length > 0 && !isLoader && (
        <Button handleClick={handleLoadMore} />
      )}
      {isModalOpen && <Modal img={modalImg} onClosseModal={closeModal} />}
      <GlobalStyle />
    </AppContainer>
  );
};