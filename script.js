const toggleSpinner = style => {
   document.getElementById("loader").style.display = style;
}
const toggleSearchResult = style => {
   document.getElementById("showBooks").style.display = style;
}

// load api data
const getBook = () => {
   const inputField = document.getElementById("inputField")
   const inputValue = inputField.value;

   toggleSpinner("block")
   toggleSearchResult("none")

   fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
   .then(res => res.json())
   .then(data => {
      displayBooks(data)
      console.log(data);
   })
   .catch((err) => {
      document.getElementById("notFound").style.display = "block"; // api error handling
      console.log(err);
   })
}

// display api data on html
const displayBooks = (data) => {
   const bookContainer = document.getElementById("bookContainer");
   const foundedData = document.getElementById("foundedData")
   bookContainer.innerHTML = '';
   const books = data.docs;

   // console.log(books.length);
   
   books.forEach(book => {
      const {title, author_name, first_publish_year, cover_i, publisher} = book;

      const div = document.createElement("div");
      div.classList = "col-sm-6 col-lg-4"
      div.innerHTML = `
         <div id="bookBox" class="book-box">
            <img class="shadow book-img" src="${`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`}" alt="">
            <div class="book-info">
               <h5 class="title">${title.slice(0, 10)}</h5>
               <p>By: ${author_name}</p>
               <p>Publish year: ${first_publish_year}</p>
               <p class="mb-0">Publisher: ${publisher.slice(0, 3)}</p>
            </div>
         </div>
      `;
      bookContainer.appendChild(div)
   });
   // founded book quantity shown here
   if (books.length === 0) {
      foundedData.innerHTML = `No results found!`;
      document.getElementById("notFound").style.display = "block";
   }
   else {
      foundedData.innerHTML = `${books.length} results shown from ${data.numFound}`
      document.getElementById("notFound").style.display = "none";
   }

   toggleSpinner("none")
   toggleSearchResult("block")
}

// make working search button on enter click
document.getElementById("inputField").addEventListener("keypress", function(event) {
   if (event.key === "Enter") {
      document.getElementById("searchBtn").click();
   }
})

