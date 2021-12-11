import React,{Component} from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from '../BooksAPI'
import Book from "./Book";

class Search extends Component{
//Define state
state={
  query:'',
  bookSearchResult:[],
  error:'',
  serverBusy:false
};
//Function to update the query and call API to search
query= e=>{
  let {query}=this.state;
  query=e.target.name==='search'? e.target.value:query;
  this.setState({query});
  query&&this.queryBooks(query); //Request data from server if the query not empty string
};
//Function to handle search
queryBooks= async query=>{
  const selectedBooks=this.props.books;
  this.setState({serverBusy:true});// set the server to busy to show the loading circuit
  try{
    const apiResponse= await BooksAPI.search(query); //get the API response from the search
    if(query){                                         //Recheck if the user reset the query during server getting the data
      const bookSearchResult=apiResponse.map(bookData=> {return({ //reformat the return data to fit it during render the DOM
        id:bookData.id,
        shelf:'none',
        img: bookData.imageLinks?`url(${bookData.imageLinks.thumbnail})`:'none',
        title:bookData.title,
        authors:bookData.authors
      });
    });
      this.updateSearchBooksShelf2(bookSearchResult,selectedBooks); //update the shelf of the returned books from the selected books
      this.setState({bookSearchResult, error:''}); //setSate with the retunred books from the search and reset any errors.
    }
    else{                                              //if the user rest the query, reset all 
      this.setState({bookSearchResult:[], error:''});
    }
  }
  catch(error){ //catch errors during fetch and update the error state, reset returned books
    console.log('Search error',error.message);
    this.setState({bookSearchResult:[],error:error.message});
  }
  this.setState({serverBusy:false}); //reset the serverBusy
}
//Function to update the searched books with the selected books in the shelf    
updateSearchBooksShelf2=(searchBooks, selectedBooks)=>{
  searchBooks.map(searchBook=> {
    const selectedBookArray=selectedBooks.filter(selectedBook=> searchBook.id===selectedBook.id);
    return searchBook.shelf= selectedBookArray.length===0? 'none': selectedBookArray[0].shelf;
  });
};
//Function to return the book instance with the searched books 
getBooks=()=>{
  const books=this.state.bookSearchResult;
  return books.map(book=><Book key={book.id} book={book} changeShelf={this.props.changeShelf}/>);
};
//Function to handle return to DOM
handleReturn=()=>{
  const {query,error,serverBusy}=this.state;
  if (error==='Failed to fetch'){
    return <p>No data, server can't reach!</p>; //return this when failed to connect with the server
  }
  else if (error.length!==0&&query.length!==0){
    return <p>There is no book find</p>; //return this when result was empty(no book found)
  }
  else if(serverBusy){
    return(
    <iframe id="server-load-image-search" title="serverLoadImage" src="https://giphy.com/embed/PUYgk3wpNk0WA" width="200" height="200" 
    frameBorder="0" allowFullScreen></iframe>
    ); //show loading circle in case of the server was requested to return data
  }
  else if(error.length===0&&query.length!==0){
   return this.getBooks();//return books if no error and query was not empty
  }
};
/**-----------Rendering of component to the DOM-----------*/
render(){
    return(
        <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input value={this.state.query} name="search" type="text" placeholder="Search by title or author"
                onChange={this.query}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {this.handleReturn()}
              </ol>
            </div>
          </div>
    );
}
};
export default Search;