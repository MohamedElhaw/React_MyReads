import React from "react";
import { Link } from "react-router-dom";
import CurrentlyReading from "./CurrentlyReading";
import WantToRead from "./WantToRead";
import Read from "./Read";

const Home = props=> {
    //Define variables
    const {books, error, serverBusy}=props.data;
    //Define books array for each shelf
    const currentReadingBooks=books.filter(book=>book.shelf==='currentlyReading');
    const wantToRead=books.filter(book=>book.shelf==='wantToRead');
    const read=books.filter(book=>book.shelf==='read');
    //Function to handle return in case of server busy return loading circle, else calling three functions for shelfs
    const handleReturn=()=>{
        return(
            serverBusy? 
            <iframe id='server-load-image-home' title='serverLoadImage' src="https://giphy.com/embed/PUYgk3wpNk0WA" width="200" height="200" 
            frameBorder="0" allowFullScreen>
            </iframe>
            :<React.Fragment>
                <CurrentlyReading books={currentReadingBooks} error={error} changeShelf={props.changeShelf}/>;
                <WantToRead books={wantToRead} error={error} changeShelf={props.changeShelf}/>;
                <Read books={read} error={error} changeShelf={props.changeShelf}/>;
            </React.Fragment> 

        );   
    };
    /**-----------Returnning function to the DOM-----------*/
    return(
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
                <div className="list-books-content">
                    {handleReturn()}
                <Link to="/search" className="open-search">Add a book</Link>
            </div>
        </div>
    );
};
export default Home;