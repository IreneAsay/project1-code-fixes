$(document).ready(function () {
  var totalBooks = [];
  var isbnInfo = [];
  var isbnResult;
  var searchYear;

  const DESIRED_NUMBER_OF_RESULTS = 10;
  // // Function that makes ajax call to fetch books and process business logic to give us all the books that pass our requirements

  function fetchBooks(offset = 0) {
    searchYear = $("#searchInputYear").val().trim();

    const queryURL = `https://openlibrary.org/search.json?q=isbn&offset=${offset}`;
    // return the ajax call (which is a promise) so that we can call `then` on it later OR we can use async/await (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
    return $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      const books = response.docs.filter(function (book) {
        // if a book does not have a publish year, return false so we can reject it

        if (!book.publish_year) {
          return false;
        }
        // From the api, we are getting publish_year back as an array,which means we need to process this array as well. Normally, we try to avoid having a loop inside a loop (the filter functions are really looping over all the items in the array), but luckily most of the publish years are small so this is pretty quick Double checking to make sure publish year is an array so we don't get errors, we could have also added that in our earlier check

        if (Array.isArray(book.publish_year)) {
          var results = book.publish_year.filter(function (year) {
            // our logic for how a book passes
            return year === parseInt(searchYear);
          });
          return results.length > 0;
        }
        // in the event we don't get an array for publish year, we will simply return false
        return false;
      });
      // We return an object for us to use later
      return {
        books,
        numberFound: response.docs.length,
      };
    });
  }

  //  Function that will continue to loop until we get the desired number of books we want. Note: we use the async keyword here so that our function will "wait" to complete the ajaz call before moving on. I encourage you to ask your professors/TA's about this

  async function getBookResults() {
    // let totalBooks = [];
    let offset = 0;
    while (totalBooks.length < DESIRED_NUMBER_OF_RESULTS) {
      // this is just for debugging, make sure to remove this later
      console.log(`
      We have ${totalBooks.length} books that pass our criteria so far
    `);
      // wrap our code in a try/catch block to gracefully handle errors and exit if we need to
      try {
        // Notice `await` here? This is where I'm telling it to wait until the function is done. For fun you can remove await, and observe how that changes the behavior of this function
        const results = await fetchBooks(offset);
        // here we are setting total books to include old and new books
        // could have also used ES6 syntax, i.e. totalbooks = [...totalbooks, ...results.books]
        totalBooks = totalBooks.concat(results.books);
        console.log(totalBooks);
        // offset by number of total results
        offset += results.numberFound;
        if (results.numberFound == 0) {
          break;
        }
      } catch (err) {
        console.log(`Error fetching books...`);
        console.log(err);
        break;
      }
    }
    return totalBooks;
  }

  // This function is here to also await getBookResults
  // When we use async on a function it turns it into a promise as well. We could have also done getBookResults().then(someFunction)
  async function run() {
    const books = await getBookResults();
    console.log(books);
    console.log("searchYear is " + parseInt(searchYear));

    // we fill array with isbn info from "books"array
    // we then use random math to pick an isbn from the array

    for (i = 0; i < books.length; i++) {
      // isbnInfo.push(books[i].isbn[0]);
      isbnInfo.push(books[i].key);
    }

    var isbnResult = Math.floor(Math.random() * 10);
    isbnAnswer = isbnInfo[isbnResult];
    // console.log(isbnInfo);
    console.log("the answer is " + isbnAnswer);
    $("#iframeTest2").attr("src", "https://openlibrary.org" + isbnAnswer);
  }

  // }
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    // $(".welcome").hide();
    var searchInputYear = $("#searchInputYear").val().trim();
    run(searchInputYear);
    // $("#iframeTest2").empty();
    // run();
  });
  // run();
});