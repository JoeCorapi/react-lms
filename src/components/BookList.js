'use strict'

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
import ModalWindow from './ModalWindow';

export class BookList extends React.Component{

    createBookRow(book){

        return (
            <tr key={book.book_id}>
                <td style={{width:"250px"}}>
                    <button type="button" className="btn btn-info" onClick={() => this.handleUpdate(book)} >
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

    handleAdd(event) {
        this.props.setModal();
        console.log(event.target);
    }

    handleUpdate(event) {
        this.props.setModal();
        console.log(event.target);
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
                                <button type="button" className="btn btn-primary btn-block" onClick={() => this.handleAdd()}>
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
                <ModalWindow showModal={this.props.showModal} setModal={this.props.setModal} />
                <h1>Books</h1>
                {content}
            </div>
        );
    }
}

BookList.propTypes = {
    book: PropTypes.object.isRequired,
    showModal: PropTypes.bool,
    setModal: PropTypes.func    
};



