'use strict';

//select an element
let theH1 = document.querySelector("h1");
console.log(theH1);

//modifying the element
theH1.textContent = "A new title!";
theH1.classList.add("text-success");
theH1.classList.add("bg-dark");
theH1.style.marginBottom = "1em"; //avoid this
let img = document.querySelector("img")
img.src = "img/husky.jpg";

let newListItem = document.createElement("li");
newListItem.innerHTML = '<a href="http://google.com">Google</a>'
console.log(newListItem);

// let ul = document.querySelector('#links');
// ul.appendChild(newListItem);

//what does a link look like?
function renderLink(url) {
    let card = document.createElement("div");
    card.classList.add('card');

    let newLink = document.createElement("div");
    newLink.innerHTML = '<a href="'+url+'">'+url+'</a>';
    // newLink.classList.add("bg-success");

    card.appendChild(newLink);

    let linkSection = document.querySelector('#linkSection');
    linkSection.appendChild(card);   
}

function renderAllLinks(urlArray) {
    for(let url of urlArray){
        renderLink(url);
    }    
}

let urls = [
    "http://google.com", "http://domain.com", "http://example.com"
];

renderAllLinks(urls);

let numberOfCookies = 3; //keep track of how many things I have

function createCookie() {
    let img = document.createElement('img');
    img.src = "img/cookie.png";
    img.alt = "A yummy cookie";
    return img;
}

function renderCookies(number) {
    let jar = document.querySelector('#cookie-jar')
    for(let i=0; i<number; i++){
        let cookie = createCookie();
        jar.appendChild(cookie);
    }
}

renderCookies(numberOfCookies);

//interaction
let addButton = document.querySelector('#add-button');
addButton.addEventListener('click', function() {
    //modify the data
    numberOfCookies++; //increment

    //clear the old rendering
    let jar = document.querySelector('#cookie-jar')
    jar.innerHTML = '';

    //re-render the (new) data
    renderCookies(numberOfCookies);
})

let eatButton = document.querySelector('#eat-button');
eatButton.addEventListener('click', function() {
    //modify the data
    numberOfCookies--; //increment

    //clear the old rendering
    let jar = document.querySelector('#cookie-jar')
    jar.innerHTML = '';

    //re-render the (new) data
    renderCookies(numberOfCookies);
})

