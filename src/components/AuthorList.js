'use strict'

import React from 'react';
import PropTypes from 'prop-types';
import AuthorActions from '../actions/authorActions';

export class AuthorList extends React.Component{

    createAuthorRow(author){

        return (
            <tr key={author.author_id}>
                <td style={{width:"290px"}}>
                    <button type="button" className="btn btn-info" >
                        Update Author
                    </button>
                    <button type="button" className="btn btn-danger mx-1">
                        Delete Author
                    </button>
                </td>
                <td> {author.author_id} </td>
                <td> {author.firstName} </td>
                <td> {author.lastName} </td>
            </tr>
        );
    }

    componentDidMount(){
        AuthorActions.readAuthors();
    }

    render() {
        
        let content = '';
        
        if(this.props.author.readState.pending){
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }

        if(this.props.author.readState.success){
            content = 
                (<table className="table table-bordered table-striped table-hover table-sm table-responsive-lg">
                    <thead className='thead-dark'>
                        <tr>
                            <th style={{width:"280px"}}>
                            <button type="button" className="btn btn-primary btn-block" onClick={() => this.handleAdd()}>
                                    Add Author
                            </button>
                            </th>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.author.authorList.map(this.createAuthorRow, this)}
                    </tbody>    
                </table>)
        }

        if(this.props.author.readState.failure){
            content = 
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading authors!!
                </div>
            )
        }

        return(
            <div>
                <h1>Authors</h1>
                {content}
            </div>
        );
    }
}

AuthorList.propTypes = {
    author: PropTypes.object.isRequired
};



