import {Book} from "./models/book.model";
const zoobooks = (function zoobooks () {
  let bookDataForImport = {}
  const categories = [
    "Communication",
    "Agile & Tech",
    "Customer Centricity",
    "Leadership & Culture",
    "Start-up & Entrepreneurial",
    "Work & Wellbeing",
    "Other"
  ];
  // const categoriesMap = {
  //   "communication": "Communication",
  //   "agile": "Agile & Tech",
  //   "tech": "Agile & Tech",
  //   "computers": "Agile & Tech",
  //   "customer": "Customer Centricity",
  //   "leadership": "Leadership & Culture",
  //   "culture": "Leadership & Culture",
  //   "startup": "Start-up & Entrepreneurial",
  //   "start-up": "Start-up & Entrepreneurial",
  //   "entrepreneur": "Start-up & Entrepreneurial",
  //   "work":  "Work & Wellbeing",
  //   "wellbeing": "Work & Wellbeing",
  //   "other": "Other",
  //   "fiction": "Other"
  // };
  const bookSearchAPI = {
    query: {
      isbn: "",
      title: "",
      author: ""
    },
    results: []
  }
  return function () {
    return {
      categories() {
        return categories;
      },
      // categoriesMap() {
      //   return categoriesMap;
      // },
      bookSearchAPI__SET(data) {
        let items = data.results.items.map( (item) => {
          return new Book(item);
          // item.volumeInfo.isbn = item.volumeInfo.industryIdentifiers? item.volumeInfo.industryIdentifiers[0].identifier : "";
          // try {
          //   item.volumeInfo.google_thumbnail = item.volumeInfo.imageLinks.thumbnail;
          // } catch (e) {
          //   item.volumeInfo.google_thumbnail = "";
          // }
          // return item;
        });
        data.results.items = items;
        for (let key in data) {
          bookSearchAPI[key] = data[key];
        }
      },
      bookSearchAPI() {
        return bookSearchAPI;
      },
      importData() {
        return bookDataForImport;
      },
      importData__SET(data) {
        bookDataForImport = data;
      },

      elements() {
        return {
          loader: document.querySelector("#loader"),
          maintenance: document.querySelector('maintenance'),
          header: {
            ctrls: {
              menuToggle: document.querySelector("#ctrl__menuToggle"),
            }
          },
          books: document.querySelector("books"),
          forms: {
            addBook: {
              form: document.querySelector("#form__addBook"),
              bookISBN: document.querySelector("[form__add-book__book-isbn]"),
              bookTitle: document.querySelector("[form__add-book__book-title]"),
              bookAuthors: document.querySelector("[form__add-book__book-authors]"),
              bookThumbnail: document.querySelector("[form__add-book__book-thumbnail]"),
              bookCategory: document.querySelector("[form__add-book__book-category]"),
              ctrls: {
                findBookByISBN: document.querySelector("#ctrl__findBookByISBN"),
                addBookToLibrary: document.querySelector("#ctrl__addBookToLibrary"),
                totalItems: document.querySelector("[form__add-book__ctrls__total-items]"),
                nextBook: document.querySelector("[form__add-book__ctrls__next-book]"),
                previousBook: document.querySelector("[form__add-book__ctrls__previous-book]")
              }
            }
          }
        }
      }
    }
  }
})();
window.zoobooks = zoobooks;
