import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-infinite-scrol',
  templateUrl: './infinite-scrol.component.html',
  styleUrls: ['./infinite-scrol.component.css']
})
export class InfiniteScrolComponent implements OnInit {
  items: number[] = []; 
  itemsR: string[] = [
    "OL7122393M",
    "OL34449487M",
    "OL9621305M",
    "OL19013040M",
    "OL11584083M",
    "OL7031272M",
    "OL14037712M",
    "OL34414266M",
    "OL7629975M",
    "OL7790644M",
    "OL37841712M",
    "OL47317069M",
    "OL34448303M",
    "OL22560714M",
    "OL2383505M",
    "OL35270209M",
    "OL14194476M",
    "OL46182944M",
    "OL32371008M",
    "OL6478450M",
    "OL14014470M",
    "OL25541616M",
    "OL13634897M",
    "OL8851350M",
    "OL9740066M",
    "OL37452736M",
    "OL7066792M",
    "OL28025973M",
    "OL32371008M",
    "OL6478450M",
    "OL14014470M",
    "OL25541616M",
    "OL13634897M",
    "OL8851350M",
    "OL9740066M",
    "OL37452736M",
    "OL7066792M",
    "OL28025973M",
    "OL33884475M",
    "OL8707724M",
    "OL7194614M",
    "OL11980239M",
    "OL9694834M",
    "OL8864633M",
    "OL8663940M",
    "OL23365952M",
    "OL8904310M",
    "OL9761880M",
    "OL33884475M",
    "OL8707724M",
    "OL7194614M",
    "OL11980239M",
    "OL9694834M",
    "OL8864633M",
    "OL8663940M",
    "OL23365952M",
    "OL8904310M",
    "OL9761880M",
    "OL7881235M",
    "OL14003960M",
    "OL25888201M",
    "OL5982605M",
    "OL24189918M",
    "OL23360773M",
    "OL24197185M",
    "OL14041043M",
    "OL37761651M",
    "OL23298552M",
    "OL7881235M",
    "OL14003960M",
    "OL25888201M",
    "OL5982605M",
    "OL24189918M",
    "OL23360773M",
    "OL24197185M",
    "OL14041043M",
    "OL37761651M",
    "OL23298552M",
    "OL23293169M",
    "OL17945484M",
    "OL27553966M",
    "OL6552114M",
    "OL6736713M",
    "OL24188598M",
    "OL7025510M",
    "OL23187105M",
    "OL23321225M",
    "OL27444251M"
]

  //a array to store the items
  isLoading = false; //to stop it form loading everything all at once 
  maxItemsToShow = 100; // Set a maximum number of items to display
  subjects = ["history", "science", "fiction", "art"]; //the subjects to pull info from
  currentPage = 8; //to keep track from what i pulled 
  booksPerPage = 10; //to know how many books are called at once

  async fetchBooksBySubject(subject : string, page : number, perPage : number) { //getting the file
    let offset = (page - 1) * perPage; //knowing where to start calling from 
    // console.log(offset)
    const url = `https://openlibrary.org/search.json?subject=${subject}&limit=${perPage}&offset=${offset}`; //a lint to fetch data from 
    const response = await fetch(url); //making a HTTP request 
    const data = await response.json(); //returns a promise that resolves with the parsed JSON data
    // console.log(data)
    return data.docs; //returning a array of dictionaries 
}

async displayBooks() { //async 
  for (const subject of this.subjects) { //loop through subjects
      const books = await this.fetchBooksBySubject(subject,this.currentPage,this.booksPerPage); //wait for the function return a document of the img numbers
      books.slice(0, this.booksPerPage).forEach((book: { title_suggest: number,cover_edition_key: string; }) => {
          this.items.push(book.title_suggest)
          let cover = book.cover_edition_key
          if(cover != undefined){
            this.itemsR.push(book.cover_edition_key)
          }
          
      });
  }

  // if (this.items.length > this.maxItemsToShow) {
  //     const itemsToRemove = this.items.length - this.maxItemsToShow;
  //     this.items.splice(0, itemsToRemove);
  //   }
}

  ngOnInit(): void {
    // this.displayBooks() //to display the first few books
    // this.currentPage++ //update the page
    // console.log(this.itemsR)
  }

  constructor() { 
    // this.displayBooks()
    // this.currentPage++
  }

  @HostListener('window:scroll', ['$event']) 
  onScroll(event: Event) {
    // Detect when the user has scrolled to the bottom of the page.
    const windowHeight = document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.scrollY; // Use scrollY instead of pageYOffset
    // console.log(windowBottom)

    if (windowBottom >= docHeight && !this.isLoading) {
      this.isLoading = true;
      this.displayBooks();
      this.currentPage++
      // Simulate a delay for loading, replace with your API call.
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  }
  
}


