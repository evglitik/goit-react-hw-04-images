import {
  ImageGalleryItems,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, webformatURL }) => {
  return (
    <ImageGalleryItems key={id}>
      <ImageGalleryItemImage src={webformatURL} alt={id} data-id={id} />
    </ImageGalleryItems>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
