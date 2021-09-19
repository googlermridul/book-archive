// load api data
const getBook = () => {
   const inputField = document.getElementById("inputField")
   const inputValue = inputField.value;

   fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
   .then(res => res.json())
   .then(data => {
      displayBooks(data)
   })
   .catch(() => {
      document.getElementById("notFound").style.display = "block"; // api error handling
   })
}

// display api data on html
const displayBooks = (data) => {
   const bookContainer = document.getElementById("bookContainer");
   const foundedData = document.getElementById("foundedData")
   bookContainer.innerHTML = '';
   const books = data.docs;
   
   books.forEach(book => {
      const {title, author_name, first_publish_year, cover_i, publisher} = book;

      const div = document.createElement("div");
      div.classList = "col-sm-6 col-lg-4"
      div.innerHTML = `
         <div id="bookBox" class="book-box">
            <img class="book-img" src="${`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`}" alt="">
            <div class="book-info">
               <h5 class="title">${title.slice(0, 5)}</h5>
               <p>By: ${author_name}</p>
               <p>Publish year: ${first_publish_year}</p>
               <p class="mb-0">Publisher: ${publisher}</p>
            </div>
         </div>
      `;
      // founded book quantity
      foundedData.innerHTML = `${books.length} results shown from ${data.numFound}`
      bookContainer.appendChild(div)
   });
   document.getElementById("notFound").style.display = "none";
}

// working search button on enter click
document.getElementById("inputField").addEventListener("keypress", function(event) {
   if (event.key === "Enter") {
      document.getElementById("searchBtn").click();
   }
})

