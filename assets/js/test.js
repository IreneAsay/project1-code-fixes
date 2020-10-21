// $(document).ready(function () {

//   var totalBooks = [];
//   var isbnArray = [];

// //   console.log("This is a test");
// //   function fetchBooks(offset = 0) {
// //     var queryURL = `http://openlibrary.org/search.json?q=isbn&offset=${offset}`;

// //     return $.ajax({
// //       url: queryURL,
// //       method: "GET",
// //     }).then(function (response) {
// //       var books = response.docs; // array

// //       var booksWithPublishYear = books.filter(function (book) {
// //         return book.publish_year;
// //       });

// //       var booksWithPublishYearOver1994 = booksWithPublishYear.filter(function (
// //         book
// //       ) {
// //         if (Array.isArray(book.publish_year)) {
// //           // loop over the array of values
// //           // check if each if one is greater that 1994
// //           var results = book.publish_year.filter(function (year) {
// //             return year >= 1994;
// //           });

// //           return results.length > 0;
// //         }
// //       });

// //       // We return an object for us to use later
// //       return {
// //         books: booksWithPublishYearOver1994,
// //         cursor: response.start,
// //         numberOfResults: response.numFound,
// //       };
// //     });
// //   }

//    const DESIRED_NUMBER_OF_RESULTS = 10;
// // // Function that makes ajax call to fetch books and process business logic to give us all the books that pass our requirements

// function fetchBooks(offset = 0) {
//   const queryURL = `http://openlibrary.org/search.json?q=isbn&offset=${offset}`;
//   // return the ajax call (which is a promise) so that we can call `then` on it later OR we can use async/await (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
//   return $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function (response) {

//     const books = response.docs.filter(function (book) {

//       // if a book does not have a publish year, return false so we can reject it
//       if(! book.publish_year) {
//         return false;
//       }

//       // From the api, we are getting publish_year back as an array,which means we need to process this array as well. Normally, we try to avoid having a loop inside a loop (the filter functions are really looping over all the items in the array), but luckily most of the publish years are small so this is pretty quick Double checking to make sure publish year is an array so we don't get errors, we could have also added that in our earlier check

//       if (Array.isArray(book.publish_year)) {
//         var results = book.publish_year.filter(function (year) {
//           // our logic for how a book passes
//           return year === 2001;

//         });
//         return results.length > 0;
//       }
//       // in the event we don't get an array for publish year, we will simply return false
//       return false;
//     });
//     // We return an object for us to use later

//     return {
//       books,
//       numberFound: response.docs.length,
//     };
//   });
// }

// //  Function that will continue to loop until we get the desired number of books we want. Note: we use the async keyword here so that our function will "wait" to complete the ajaz call before moving on. I encourage you to ask your professors/TA's about this

//     async function getBookResults() {
//    // let totalBooks = [];
//     let offset = 0;
//     while (totalBooks.length < DESIRED_NUMBER_OF_RESULTS) {
//       // this is just for debugging, make sure to remove this later
//     console.log(`
//     We have ${totalBooks.length} books that pass our criteria so far
//   `)
//   // wrap our code in a try/catch block to gracefully handle errors and exit if we need to
//   try {
//     // Notice `await` here? This is where I'm telling it to wait until the function is done. For fun you can remove await, and observe how that changes the behavior of this function
//     const results = await fetchBooks(offset)
//     // here we are setting total books to include old and new books
//     // could have also used ES6 syntax, i.e. totalbooks = [...totalbooks, ...results.books]
//     totalBooks = totalBooks.concat(results.books);

//     // offset by number of total results
//     offset = results.numberFound
//   } catch (err) {
//     console.log(`Error fetching books...`);
//     console.log(err);
//     break;
//   }
// }

// return totalBooks;
// }
// // This function is here to also await getBookResults
// // When we use async on a function it turns it into a promise as well. We could have also done getBookResults().then(someFunction)
//   async function run() {
//   const books = await getBookResults();
//   console.log(books);
//   }
//   run();

// // //   // below "for loop" extracts the "first" isbn from the isbn array
// //   for(i = 0; i < books.length; i++){
// //         isbnArray.push(books[i].isbn[0]);
// //       }
// //  }
// //   console.log(isbnArray);
// // }
// // run();

// // Make sure you are comfortable with promises! =)

// //   function searchArchive(searchInputUrl, searchInputYear) {
// //     // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
// //     var queryURL =
// //       "https://cors-anywhere.herokuapp.com/http://archive.org/wayback/available?url=" +
// //       searchInputUrl +
// //       "&timestamp=" +
// //       searchInputYear +
// //       "0601";

// //     $.ajax({
// //       url: queryURL,
// //       method: "GET",
// //     })
// //       .then(function (response) {
// //         // Printing the entire object to console
// //         console.log(response);
// //         var status = $("<p>").text(response.archived_snapshots.closest.status);
// //         var time = $("<p>").text(response.archived_snapshots.closest.timestamp);
// //         var urlTest = $("<p>").text(response.archived_snapshots.closest.url);
// //         $("#insertTest").append(`
// //           <p>Currently Loading the webpage for you</p>
// //         `);
// //         $("#iframeTest").attr("src", response.archived_snapshots.closest.url);
// //       })
// //       .catch(function (err) {
// //         console.log(`There was an error ${err.message}`);
// //         console.log(err);
// //       });
// //   }
// //   // searchArchive();

// //   $("#searchBtn").on("click", function (event) {
// //     event.preventDefault();
// //     // var timeValue = inputCity;
// //     var searchInputUrl = $("#searchInputUrl").val().trim();
// //     var searchInputYear = $("#searchInputYear").val().trim();
// //     searchArchive(searchInputUrl, searchInputYear);
// //     // localStorage.setItem(timeValue, inputCity);
// //   });
// // });

// // $("#iframeTest").on("load", function () {
// //   $("#insertTest").empty();
// });
