'use strict'

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
import {Modal, FormGroup, ModalHeader, ModalBody, ModalFooter,Input, Label, Button} from 'reactstrap';

export class BookList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            newBookData:{
                book_id: '',
                title: 'Title',
                author: 'Author'
            },
            newBookModal: false,
            editBookModal: false,

            editBookData:{
                book_id: '',
                title: '',
                author: ''
            },

        }

}

    createBookRow(book){

        return (
            <tr key={book.book_id}>
                <td style={{width:"250px"}}>
                    <button type="button" className="btn btn-info" onClick={this.editBook.bind(this, book.book_id, book.title, book.author)} >
                        Update Book   
                    </button>
                    <button type="button" className="btn btn-danger mx-1" onClick={() => this.handleDelete(book)}>
                        Delete Book
                    </button>
                </td>
                <td> {book.book_id} </td>
                <td> {book.title} </td>
                <td> {book.author} </td>
            </tr>
        );
    }

    toggleNewBookModal() {
        this.setState({
            newBookModal: ! this.state.newBookModal
        })
    }

    toggleEditBookModal() {
        this.setState({
            editBookModal: ! this.state.editBookModal
        })
    }

    editBook(book_id, title, author) {
        this.setState({
            editBookData: {book_id, title, author}, editBookModal: ! this.state.editBookModal
        });
    }

    addBook() {
        BookActions.addBook(this.state.newBookData);
        this.setState({newBookModal: false, newBookData:{
            book_id: '',
            title: 'Title',
            author: 'Author'
        } });
    }

    updateBook() {
        BookActions.updateBook(this.state.editBookData);
        this.setState({
            editBookModal: false, editBookData: {book_id: '', title: '', author: ''}
        });
    }

    handleDelete(book) {
        BookActions.deleteBook(book);
    }

    componentDidMount(){
        BookActions.readBooks();
    }

    render() {
        
        let content = '';
        
        if(this.props.book.readState.pending){
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }

        if(this.props.book.readState.success){
            content = 
                (<table className="table table-bordered table-striped table-hover table-sm table-responsive-lg">
                    <thead className='thead-dark'>
                        <tr>
                            <th style={{width:"250px"}}>
                                <button type="button" className="btn btn-primary btn-block" onClick={this.toggleNewBookModal.bind(this)}>
                                    Add Book
                                </button>
                            </th>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.book.bookList.map(this.createBookRow, this)}
                    </tbody>    
                </table>)
        }

        if(this.props.book.readState.failure){
            content = 
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading books!
                </div>
            )
        }

        return(
            <div>
                <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add New Book</ModalHeader>
                <ModalBody>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input id="title" value={this.state.newBookData.title} onChange={(e) => {
                        let { newBookData } = this.state;
                        newBookData.title = e.target.value;
                        this.setState({newBookData});
                    }} />
                </FormGroup>
                <FormGroup>
                    <Label for="author">Author</Label>
                    <Input id="author" value={this.state.newBookData.author} onChange={(e) => {
                        let { newBookData } = this.state;
                        newBookData.author = e.target.value;
                        this.setState({newBookData});
                    }} />
                </FormGroup>                
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.addBook.bind(this)}>Add Book</Button>{' '}
                  <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
                </ModalFooter>
              </Modal>

              <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
              <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Update Book</ModalHeader>
              <ModalBody>
              <FormGroup>
                  <Label for="title">Title</Label>
                  <Input id="title" value={this.state.editBookData.title} onChange={(e) => {
                    let { editBookData } = this.state;
                    editBookData.title = e.target.value;
                    this.setState({editBookData});
                }} />
              </FormGroup>
              <FormGroup>
                  <Label for="author">Author</Label>
                  <Input id="author" value={this.state.editBookData.author} onChange={(e) => {
                      let { editBookData } = this.state;
                      editBookData.author = e.target.value;
                      this.setState({editBookData});
                  }} />
              </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
                <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
              </ModalFooter>
            </Modal>
                <h1>Books</h1>
                {content}
            </div>
        );
    }
}

BookList.propTypes = {
    book: PropTypes.object.isRequired,
};



