const getBook = () => {
   const inputField = document.getElementById("inputField")
   const inputValue = inputField.value;

   if (inputValue === '') {
      document.getElementById("emptyField").style.display = "block";
   }

   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
   .then(res => res.json())
   .then(data => {
      displayBooks(data.meals)
   })
   .catch(() => {
      document.getElementById("notFound").style.display = "block";
   })
}


const displayBooks = (data) => {
   const bookContainer = document.getElementById("bookContainer");
   bookContainer.innerHTML = '';

   const foundedData = document.getElementById("foundedData")

   const books = data;
   
   books.forEach(book => {
      const {idMeal, strMeal, strMealThumb, strInstructions} = book;

      const div = document.createElement("div");
      div.classList = "col-sm-6 col-lg-4"
      div.innerHTML = `
         <div id="bookBox" class="book-box">
            <img class="img-fluid book-img" src="${strMealThumb}" alt="">
            <div className="book-info">
               <h5>${strMeal}</h5>
               <p class="mb-0 mt-3">${strInstructions.slice(0, 100)}</p>
            </div>
         </div>
      `;
      foundedData.innerHTML = `${books.length} results shown from`
      bookContainer.appendChild(div)
   });
   document.getElementById("emptyField").style.display = "none";
   document.getElementById("notFound").style.display = "none";
}


document.getElementById("inputField").addEventListener("keypress", function(event) {
   if (event.key === "Enter") {
      document.getElementById("searchBtn").click();
   }
})

