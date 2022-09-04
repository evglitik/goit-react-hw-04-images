import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, onModal }) => {
  return (
    <ImageGalleryList onClick={e => {
      if (e.target !== e.currentTarget) {
        onModal(e.target.dataset.id)
      }
    }
    }>
      {images.map(({ id, webformatURL }) => {
        return (
          <ImageGalleryItem key={id} id={id} webformatURL={webformatURL} />
        );
      })}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    }).isRequired
  ).isRequired,
  onModal: PropTypes.func.isRequired,
};
