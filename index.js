// Nav Bar Menu
let menuLinks = [
  { text: "home", href: "/home" },
  {
    text: "about",
    href: "#",
    subLinks: [
      { text: "me", href: "/about/me" },
      { text: "you", href: "/about/you" },
      { text: "us", href: "//about/us" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "register", href: "/account/register" },
      { text: "login", href: "/account/login" },
    ],
  },
]


const main = document.querySelector("main")
//Set the background color of main to the values stored in the --main-gb CSS custom property
//Assign a string that uses the CSS var() function like this: 'var'(--main-bg)'
main.style.backgroundColor = "var(--main-bg)"
//Set the content of main to to <h1>DOM Manipulation</h1>.
main.innerHTML = "<h1>Lorem Ipsum</h1>"
//Add a class of flex-ctr to main
//Use the Element.classList API
main.classList.add("flex-ctr")

//Select and cache the <nav id="top-menu"> element is a variable named topMenu
const topMenu = document.getElementById("top-menu")
// //Set the height of the topMenu elementto be 100%
topMenu.style.height = "100%"
// //Set the background color of topMenu to the value stored in the --top-menu-gh CSS custom property
topMenu.style.backgroundColor = "var(--top-menu-bg)"
//Add a class of flex-around to topMenu
topMenu.classList.add("flex-around")

// //Part 3
// //iterate over the entire menuLinks array and for each "link" object...
menuLinks.forEach((link) => {
  //create an <a> element
  const anchor = document.createElement("a")
  //on the new element, add an href attribute with its value set to the href property of the "link" object
  anchor.href = link.href
  //set the new element's content to the value of the text property of the "link" object
  anchor.textContent = link.text
  //append the new element to the topMenu element
  topMenu.appendChild(anchor)
})


//Select and cache the <nav id="sub-menu"> element in a variable named subMenu
const subMenu = document.getElementById("sub-menu")

//Set the height subMenu element to be "100%"
subMenu.style.height = "100%"
//Set the background color of subMenu to the value stored in the --sub-menu-bg CSS custom property
subMenu.style.backgroundColor = "var(--sub-menu-bg)"
//Add the class of flex-around to the subMenu element
subMenu.classList.add("flex-around")
//Set the CSS position property of subMenu to the value of absolute
subMenu.style.position = "absolute"
//Set the CSS top property of subMenu to the value of 0
subMenu.style.top - "0"

//Part 2.4 & 5
//Select and cache all of the <a> elements inside of topMenu in a variable named topMenuLinks.
const topMenuLinks = topMenu.querySelectorAll("a")

//helper function called buildSubmenu
function buildSubmenu(subLinks) {
  //Clear the current contents of subMenu
  subMenu.innerHTML = ""

  //Iterate over the subLinks array, passed as an argument
  subLinks.forEach((link) => {
    //Create an <a> element
    const subLink = document.createElement("a")

    //Add an href attribute to the <a>, with the value set by the href property of the "link" object
    subLink.href = link.href

    //Set the element's content to the value of the text property of the "link" object
    subLink.textContent = link.text

    //Append the new element to the subMenu
    subMenu.appendChild(subLink)
  })
}

//Attach a delegated 'click' event listener to topMenu
topMenu.addEventListener("click", function (event) {
  //Call the event object's preventDefault()method
  event.preventDefault()

  //Immediately return if the element clicked was NOT an <a> element
  if (!event.target.matches("a")) return

  //Log the content of <a> to verify the handler is working
  console.log(event.target.textContent)

  // If the Home link is clicked, an <h1>Home</h1>should be displayed
  const clickedText = event.target.textContent.toLowerCase()

  if (clickedText === "home") {
  main.innerHTML = "<h1>Home</h1>"
  }

  //Create and cache a 'link' object. This iterates through the 'menuLinks' array and stores the object whose 'text' property matches the lowercase text content of the clicked '<a>' element & is later evaluated to check if the clicked link has an associated sublink
  const clickedLink = menuLinks.find(
    (link) => link.text.toLowerCase() === event.target.textContent.toLowerCase()
  )

  //Toggle the 'active' class on the clicked <a> element
  event.target.classList.toggle("active")

  //Check to see if the <a> element is active
  if (event.target.classList.contains("active")) {
    //If the link has sublinks, set the CSS top property of subMenu to 100%
    if (clickedLink && clickedLink.subLinks) {
      subMenu.style.top = "100%"
      buildSubmenu(clickedLink.subLinks)
    } else {
      //If the link doesn't have subLinks, set the CSS top property of subMenu to 0
      subMenu.style.top = "0"
    }
  } else {
    //If the clicked <a> element is not active, set the CSS top property of subMenu to 0
    subMenu.style.top = "0"
  }

  //Iterate over all of the <a> elements in topMenuLinks
  topMenuLinks.forEach((link) => {
    //Remove the 'active' class for all <a> elements
    if (link != event.target) {
      link.classList.remove("active")
    }
  })
})

//Attach a delegated 'click' event listener to subMenu
subMenu.addEventListener("click", function (subEvent) {
  //Call the event object's preventDefault() method
  subEvent.preventDefault()

  //return if the element clicked was not an <a> element
  if (!subEvent.target.matches("a")) return

  //Log the content of the <a> to verify the handler is working
  console.log(subEvent.target.textContent)

  //Set the CSS top property of subMenu to 0
  subMenu.style.top = "0"

  //Remove the active class from each <a> element in topMenuLinks
  topMenuLinks.forEach((link) => {
    link.classList.remove("active")
  })
  // //Update the contents of main, within an <h1>, to the contents of the <a> element clicked within subMenu
  const clickedContent = subEvent.target.textContent.toLowerCase()
  
  if (clickedContent === "register" || "login") {
    openModal()
    if (closeModalButton) {
      closeModalButton.addEventListener("click", function (event) {
        event.preventDefault()
        closeModal()
      })
    }
  }

  let updatedContent = ""

  updatedContent = clickedContent.toUpperCase()

  main.innerHTML = `<h1>${updatedContent}</h1>`

})

// Get references to the elements
const openModalLink = document.getElementById("openModal")
const formContainer = document.getElementById("formContainer")
const closeModalButton = document.getElementById("closeModal")


// Function to open the modal
function openModal() {
  formContainer.style.display = "block"
}

// Function to close the modal
function closeModal() {
  formContainer.style.display = "none"
}

