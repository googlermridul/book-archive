const getBook = () => {
   const inputField = document.getElementById("inputField")
   const inputValue = inputField.value;

   fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
   .then(res => res.json())
   .then(data => {
      displayBooks(data.docs)
      console.log(data.numFound);
   })
}


const displayBooks = (books) => {
   const bookContainer = document.getElementById("bookContainer");
   bookContainer.innerHTML = '';
   // console.log(books.length);
   
   books.forEach(book => {
      console.log(book);

      const div = document.createElement("div");
      div.classList = "col-6 col-md-4 col-lg-3"
      div.innerHTML = `
         <div class="book-box">
            <img class="book-img" src="${`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}" alt="">
            <h5>${book.title}</h5>
         </div>
      `;
      bookContainer.appendChild(div)
   });
}

// 
// title
// subtitle
// author_name
// first_publish_year
// cover_i
// publisher