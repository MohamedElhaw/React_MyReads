import React,{Component} from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Routes} from 'react-router-dom'
import Home from './Components/Home'
import './App.css'
import Search from './Components/Search'

class BooksApp extends Component {
  //Define state
  state = {
   books:[{id:'',shelf:'', img:'', title:'',authors:[]}],
   error:'',
   serverBusy: false
  };
  //Get all the data when the component mounted
   componentDidMount(){
    this.getAllData();
  };
  //Function to get all Data from API
  getAllData=async ()=>{
    this.setState({serverBusy:true}); //before calling the server, set the state to busy to load loading circle
    try{
      const allBooksData= await BooksAPI.getAll(); //call API and save the all books
      const books=allBooksData.map(bookData=> {return({  //save the all data in required format to DOM
        id:bookData.id,
        shelf:bookData.shelf,
        img:bookData.imageLinks?`url(${bookData.imageLinks.thumbnail})`:'none',
        title:bookData.title,
        authors:bookData.authors
      });
      });
      const error='';
      this.setState({books, error,serverBusy:false}); //set the state of the get books, reset error and server busy
    }
    //in case of errors, log it. set the state of error, and reset server busy.
    catch(error){ 
      console.log('getAllData',error);
      this.setState({error:error.message, serverBusy:false});
      setTimeout(()=>error.message==='Failed to fetch'&&alert(`Server can't reach, please check your internet connection!`),1000);// in case of failed to fetch , show the alert
    }
  };
  //Function to handle the change of shelf 
  handleShelfChange=async (book,reqShelf)=>{
    try{
      await BooksAPI.update({id:book.id},reqShelf); //call API to update the changes requried
      const bookNewData= await BooksAPI.get(book.id); //get updated book from server
      book.shelf=bookNewData.shelf; //update book with new shelf
      let books=this.state.books.filter(currentBook=>currentBook.id!==book.id); //remove old book data from book array
      books.push(book); //add new book to the books array
      this.setState({books}); //set the new state with the updates
    }
    catch(error){
      console.log('handleShelfChange error',error);// log any error during update
      error.TypeError==='Failed to fetch'&&alert(`Server can't reach, please check your internet connection!`); // in case of failed to fetch , show the alert
    }
  };

/**-----------Rendering of component to the DOM-----------*/
  render() {
    const {books}=this.state;
    return (
      <div className="app">
      <Routes>
          <Route exact path="/" element={<Home data={{...this.state}} changeShelf={this.handleShelfChange}/>}/>
          <Route path="/search" element={<Search books={books} changeShelf={this.handleShelfChange}/>}/>
      </Routes>
      </div>      
    );
  }
};

export default BooksApp
