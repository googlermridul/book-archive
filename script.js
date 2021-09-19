const getBook = () => {
   const inputField = document.getElementById("inputField")
   const inputValue = inputField.value;

   // document.getElementById("loader").style.display = "block";
   // document.getElementById("bookBox").style.display = "none";

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
   console.log(books.length);
   
   books.forEach(book => {
      console.log(book);
      const {title, subtitle, author_name, first_publish_year, cover_i, publisher} = book;

      const div = document.createElement("div");
      div.classList = "col-sm-6 col-lg-4"
      div.innerHTML = `
         <div id="bookBox" class="book-box">
            <img class="book-img" src="${`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`}" alt="">
            <div class="book-info">
               <h5 class="title">${title}</h5>
               <p>Publish year: ${first_publish_year}</p>
               <p class="mb-0">Publisher: ${publisher}</p>
            </div>
         </div>
      `;
      bookContainer.appendChild(div)
   });
   // document.getElementById("loader").style.display = "none";
   // document.getElementById("bookBox").style.display = "block";
}


// const toggleLoader = style => {
//    document.getElementById("loader").style.display = style
// }


document.getElementById("inputField").addEventListener("keypress", function(event) {
   if (event.key === "Enter") {
      document.getElementById("searchBtn").click();
   }
})