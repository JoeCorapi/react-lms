'use strict'

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
//import FormModal from './FormModal';

export class BookList extends React.Component{

    createBookRow(book){

        return (
            <tr key={book.book_id}>
                <td style={{width:"250px"}}>
                    {/* <FormModal showModal={this.state.showModal} hideModalHandler={this.hideModalHandler}></FormModal> */}
                    <button type="button" className="btn btn-info" >
                        Update Book   
                    </button>
                    <button type="button" className="btn btn-danger mx-1">
                        Delete Book
                    </button>
                </td>
                <td> {book.book_id} </td>
                <td> {book.title} </td>
                <td> {book.author} </td>
            </tr>
        );
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
                            <th style={{width:"250px"}}></th>
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
                <h1>Books</h1>
                {content}
            </div>
        );
    }
}

BookList.propTypes = {
    book: PropTypes.object.isRequired
};



