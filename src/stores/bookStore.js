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

    resetReadState(){
        _bookStore.book.readState = {
            pending:false,
            success:false,
            failure:false
          }
    }
    resetCreateState(){
        _bookStore.book.createState = {
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

        //CREATE FUNCTIONS
        case 'create_book_successful':
            BookStore.resetCreateState();

            _bookStore.book.bookList.push({
                book_id: Math.max(..._bookStore.book.bookList.map(b => b.book_id)) + 1,
                title: action.data.title,
                author: action.data.author
            });

            _bookStore.book.createState.success = true;
            BookStore.emitChange();
            break;
        case 'create_book_failure':
            BookStore.resetCreateState();
            _bookStore.book.createState.failure = true;
            BookStore.emitChange();
            break;

        //UPDATE FUNCTIONS
        case 'update_book_successful':{
                BookStore.resetUpdateState();
                console.log(action.data);
                const index = _bookStore.book.bookList.findIndex(b => b.book_id === action.data.book_id);
                _bookStore.book.bookList[index] = {
                    book_id: action.data.book_id,
                    title: action.data.title,
                    author: action.data.author
                };
                _bookStore.book.updateState.success = true;
                BookStore.emitChange();
            }
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
                b => b.book_id !== action.data.book_id
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