import React, { Component } from 'react';
import { Link }from 'react-router-dom';
import Modal from '../modal/Modal'

class ModalTrigger extends Component {

  state = {
    showModal: false
  }

  handleToggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  }

  render() {
    return (
      <div onClick={() => this.handleToggleModal()} >
        <Link to={`/livro/${this.props.book.id}`}>
          {this.props.children}
        </Link>
          {this.state.showModal &&
            <Modal
              onCloseRequest={() => this.handleToggleModal()}
              book={this.props.book}
            />
          }
      </div>
    );
  }
}

export default ModalTrigger