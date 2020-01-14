import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios'

const BooksActions = {
    readBooks: function(){
        Dispatcher.dispatch({
            actionType: 'read_books_started'
        });
        axios.get(`http://www.mocky.io/v2/5daca80c30000092002987ad`)
        .then(res => {
            Dispatcher.dispatch({
                actionType: 'read_books_successful',
                data:  res.data
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_books_failure'
            });
        });
    },

    addBook: function(book){
        axios.post(`http://www.mocky.io/v2/5daca80c30000092002987ad`, book)
        .then( () => {
            Dispatcher.dispatch({
                actionType: 'create_book_successful',
                data: book
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'create_book_failure'
            });
        });
    },   

    updateBook: function(book){
        axios.put(`http://www.mocky.io/v2/5daca80c30000092002987ad`, book)
        .then( () => {
            Dispatcher.dispatch({
                actionType: 'update_book_successful',
                data:  book
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'update_book_failure'
            });
        });
    },

    deleteBook: function(book){
        console.log(book.book_id);
        axios.delete(`http://www.mocky.io/v2/5daca80c30000092002987ad`, {params: {book_id: book.book_id}})
        .then( () => {
            Dispatcher.dispatch({
                actionType: 'delete_book_successful',
                data:  book
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'delete_book_failure'
            });
        });
    }
}

module.exports = BooksActions;