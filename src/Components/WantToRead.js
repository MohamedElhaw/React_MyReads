import React from "react";
import Book from "./Book";

const WantToRead= props => {
    //Define variables
    const {books,error}=props;
    //function to handle return to the DOM
    const handleReturn=()=>{
        if (error==='Failed to fetch'){
            return <p>No data, server can't reach!</p>; //return this when failed to connect with the server
        }
        else if (books.length===0&&error.length===0){
            return <p>Currently no books on this shelf</p>; //return this when no book at this shelf
        }
        else{
           return books.map(book=><Book key={book.id} book={book} changeShelf={props.changeShelf}/>); //return the book data when no errors and book array was not empty 
        }
    };
    /**-----------Returnning function to the DOM-----------*/
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {handleReturn()}
                </ol>
            </div>
        </div>
    );  
};
export default WantToRead;