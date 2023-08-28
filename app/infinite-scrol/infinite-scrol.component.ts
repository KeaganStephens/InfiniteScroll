import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-infinite-scrol',
  templateUrl: './infinite-scrol.component.html',
  styleUrls: ['./infinite-scrol.component.css']
})
export class InfiniteScrolComponent implements OnInit {
  // items: number[] = [];
  // isLoading = false;
  // maxItemsToShow = 100; // Set a maximum number of items to display
  // last = 1;

  // constructor() { }

  // ngOnInit(): void {
  //   this.loadItems();
  // }

  // loadItems() {
  //   // Simulate loading new items.
  //   for (let i = 0; i < 22; i++) {
  //     this.items.push(this.last);
  //     this.last++
  //   }

  //   // Remove items from the beginning if the array exceeds the maximum limit
  //   if (this.items.length > this.maxItemsToShow) {
  //     const itemsToRemove = this.items.length - this.maxItemsToShow;
  //     this.items.splice(0, itemsToRemove);
  //   }
  // }

  // @HostListener('window:scroll', ['$event'])
  // onScroll(event: Event) {
  //   // Detect when the user has scrolled to the bottom of the page.
  //   const windowHeight = document.documentElement.offsetHeight;
  //   const body = document.body;
  //   const html = document.documentElement;
  //   const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  //   const windowBottom = windowHeight + window.scrollY; // Use scrollY instead of pageYOffset

  //   if (windowBottom >= docHeight && !this.isLoading) {
  //     this.isLoading = true;
  //     this.loadItems();
  //     // Simulate a delay for loading, replace with your API call.
  //     setTimeout(() => {
  //       this.isLoading = false;
  //     }, 1000);
  //   }
  // }


  items: number[] = [];
  isLoading = false;
  maxItemsToShow = 100; // Set a maximum number of items to display
  last = 1;
  subjects = ["history", "science", "fiction", "art"];
  currentPage = 1;
  booksPerPage = 1;
  constructor() { }

  async fetchBooksBySubject(subject : string, page : number, perPage : number) {
    const offset = (page - 1) * perPage;
    const url = `https://openlibrary.org/search.json?subject=${subject}&limit=5&offset=${offset}`; // Adjust limit as needed
    const response = await fetch(url);
    const data = await response.json();
    return data.docs;
}

async displayBooks() {
  const bookList = document.getElementById("bookList");

  for (const subject of this.subjects) {
      const books = await this.fetchBooksBySubject(subject,this.currentPage,this.booksPerPage);

      // Display the subject as a heading
      // const subjectHeading = document.createElement("h2");
      // subjectHeading.textContent = `Books on ${subject}`;
      // bookList.appendChild(subjectHeading);

      // Display two books from the subject
      // const booksContainer = document.createElement("ul");
      books.slice(0, 5).forEach((book: { title_suggest: number; }) => {
          // const bookItem = document.createElement("li");
          this.items.push(book.title_suggest)

      });
  }
}

  ngOnInit(): void {
    this.displayBooks()
    this.currentPage++
  }

  // loadItems() {
  //   // Simulate loading new items.
  //   for (let i = 0; i < 22; i++) {
  //     this.items.push(this.last);
  //     this.last++
  //   }

  //   // Remove items from the beginning if the array exceeds the maximum limit
  //   if (this.items.length > this.maxItemsToShow) {
  //     const itemsToRemove = this.items.length - this.maxItemsToShow;
  //     this.items.splice(0, itemsToRemove);
  //   }
  // }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Detect when the user has scrolled to the bottom of the page.
    const windowHeight = document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.scrollY; // Use scrollY instead of pageYOffset

    if (windowBottom >= docHeight) {
      this.isLoading = true;
      this.displayBooks();
      this.currentPage++
      // Simulate a delay for loading, replace with your API call.
      // setTimeout(() => {
      //   this.isLoading = false;
      // }, 1000);
    }
  }
  
}


