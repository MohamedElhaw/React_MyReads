import React from "react";

const Book=props=>{
    //Function to handle shelf selection and send the selected to App.js to change shelf
   const handleShelfSelection=e=>{
        let {shelf}=props.book;
        shelf= e.target.name==="selection"? e.target.value:shelf; //get requried shelf
        props.changeShelf(props.book,shelf); //Sending to App.js to handle shelf change
    };
    /**-----------Returnning function to the DOM-----------*/
    return(
        <li>
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:props.book.img}}></div>
                    <div className="book-shelf-changer">
                        <select value={props.book.shelf} name="selection" onChange={handleShelfSelection}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{props.book.title}</div>
                <div className="book-authors">{props.book.authors && props.book.authors.map(author=><div key={author}>{author}</div>)}</div>
            </div>
        </li>
    );
};
export default Book;