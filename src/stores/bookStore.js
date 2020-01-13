import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _bookStore = {
    book:{
        bookList: [],
        readState:{
            pending:false,
            success:false,
            failure:false
        },
        error: ''
    }
};

class BookStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }


    getAllBooks(){
        return _bookStore.book;
    }

    addBook(){

    }
    
    updateBook(){
    
    }

    deleteBook(){

    }

    resetReadState(){
        _bookStore.book.readState = {
            pending:false,
            success:false,
            failure:false
          }
    }
    resetUpdateState(){
        _bookStore.book.updateState = {
            success:false,
            failure:false
          }
    }
    resetDeleteState(){
        _bookStore.book.deleteState = {
            success:false,
            failure:false
          }
    }
}

const BookStore = new BookStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){

        //READ FUNCTIONS
        case 'read_books_successful':
            BookStore.resetReadState();
            _bookStore.book.bookList = action.data;
            _bookStore.book.readState.success = true;
            BookStore.emitChange();
            break;
        case 'read_books_failure':
            BookStore.resetReadState();
            _bookStore.book.readState.failure = true;
            BookStore.emitChange();
            break;
        case 'read_books_started':
            BookStore.resetReadState();
            _bookStore.book.readState.pending = true;
            BookStore.emitChange();
            break;

        //UPDATE FUNCTIONS
        case 'update_book_successful':
            BookStore.resetUpdateState();
            _bookStore.book.updateState.success = true;
            BookStore.emitChange();
            break;
        case 'update_book_failure':
            BookStore.resetUpdateState();
            _bookStore.book.updateState.failure = true;
            BookStore.emitChange();
            break;

        //DELETE FUNCTIONS   
        case 'delete_book_successful':{
            BookStore.resetDeleteState();

            _bookStore.book.bookList = _bookStore.book.bookList.filter(
                b => b.book_id !== action.data.book_id,
              );

            _bookStore.book.deleteState.success = true;
            BookStore.emitChange();
        }
            break;           
        case 'delete_book_failure':
            BookStore.resetDeleteState();
            _bookStore.book.deleteState.failure = true;
            BookStore.emitChange();
            break;                     
    default:
            return;
    }
} );

export default BookStore;