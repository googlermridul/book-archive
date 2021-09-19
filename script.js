const getBook = () => {
   const inputField = document.getElementById("inputField")
   const inputValue = inputField.value;

   if (inputValue === '') {
      console.log("plese write something to display");      
   }

   fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
   .then(res => res.json())
   .then(data => {
      displayBooks(data)
   })
}


const displayBooks = (data) => {
   const bookContainer = document.getElementById("bookContainer");
   bookContainer.innerHTML = '';

   const books = data.docs;
   
   books.forEach(book => {
      const {title, author_name, first_publish_year, cover_i, publisher} = book;

      const foundedData = document.createElement('p');
      foundedData.innerHTML = `<p>${books.length} results shown from ${data.numFound}</p>`

      const div = document.createElement("div");
      div.classList = "col-sm-6 col-lg-4"
      div.innerHTML = `
         <div id="bookBox" class="book-box">
            <img class="book-img" src="${`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`}" alt="">
            <div class="book-info">
               <h5 class="title">${title}</h5>
               <p>By: ${author_name}</p>
               <p>Publish year: ${first_publish_year}</p>
               <p class="mb-0">Publisher: ${publisher}</p>
            </div>
         </div>
      `;
      bookContainer.appendChild(foundedData)
      bookContainer.appendChild(div)
   });
   
}


document.getElementById("inputField").addEventListener("keypress", function(event) {
   if (event.key === "Enter") {
      document.getElementById("searchBtn").click();
   }
})