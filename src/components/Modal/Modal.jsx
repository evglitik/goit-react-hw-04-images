import { ModalContainer, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';
import { Component } from 'react';

export class Modal extends Component {
  static propTypes = {
    img: PropTypes.string.isRequired,
    onClosseModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClosseModal();
    }
  };

  handleClicOverley = e => {
    const { onClosseModal } = this.props;
    if (e.currentTarget === e.target) {
      onClosseModal();
    }
  };

  render() {
    const { img } = this.props;
    return (
      <Overlay
        onClick={e => {
          this.handleClicOverley(e);
        }}
      >
        <ModalContainer>
          <img src={img} alt="" />
        </ModalContainer>
      </Overlay>
    );
  }
}
