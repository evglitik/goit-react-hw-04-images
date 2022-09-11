import { ModalContainer, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ img, onClosseModal }) => {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onClosseModal();
        console.log('key esc');
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClosseModal]);

  const handleClicOverley = e => {
    if (e.currentTarget === e.target) {
      onClosseModal();
    }
  };

  return (
    <Overlay
      onClick={e => {
        handleClicOverley(e);
      }}
    >
      <ModalContainer>
        <img src={img} alt="" />
      </ModalContainer>
    </Overlay>
  );
};

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  onClosseModal: PropTypes.func.isRequired,
};
