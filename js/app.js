/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


//=>navbar container
const navbarContainer = document.getElementById("navbar__list");

//home sections
const sections = document.querySelectorAll('section');

//main
const main = document.querySelector('main');

//header height
const headerHeight = 40;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//=> scroll to top
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

//=> section in viewport
const isSectionInViewPort = (section) => {
    const sectionPosition = section.getBoundingClientRect();
    console.log(sectionPosition);
    return sectionPosition.top < 50 && sectionPosition.bottom > 50; // Near Top
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

const createNavElements = (section) => {
	//=> create nav item 
	 const navItem = document.createElement('li');
	 navItem.className = 'navbar__item';
	 //=> create a anchor tag
	 const navItemAnchor = document.createElement('a');
	 navItemAnchor.className = 'menu__link';
	 navItemAnchor.textContent = section;
	 if (section == 'Home'){
	 	section = '';
	 }
	 navItemAnchor.setAttribute('href', `#${section}`);

	 //=> append a as child to li
	 navItem.appendChild(navItemAnchor);

	 //=> append navitem as child to container
	 navbarContainer.appendChild(navItem);

}

const buildNavbar = () => {
	//build sections links
	sections.forEach(section => {
		const sectionId = section.getAttribute('id');
		createNavElements(sectionId);

	});
}


//Add active to navbar items
const addActiveToNavbar = (section) => {

	let sectionId = section.getAttribute("id");

	document.querySelectorAll('.menu__link').forEach(link => {

		link.classList.remove('active__link');

		if (link.getAttribute('href') === `#${sectionId}`) {
			link.classList.add('active__link');
		}
	})
	 
}

// Add class 'active' to section when near top of viewport
const addActiveSection = () => {
    
    //show scroll btn on scroll
	showScrollBtn()

	sections.forEach(section => {

		section.classList.remove('your-active-class');

	    if (isSectionInViewPort(section)) {

	        //console.log('inviewport' + section.getAttribute("id"));
	        section.classList.add('your-active-class');
            
	        //activate nav link
	        addActiveToNavbar(section);

	    }

	});   
}

// Scroll to anchor ID using scrollTO event

const scrollTo = () => {
	document.querySelectorAll('a.menu__link').forEach(element => {

		element.addEventListener("click", function (event) {
          event.preventDefault();
          const section_id = event.target.getAttribute("href");
  
          const scrollTarget = document.querySelector(section_id);
          //scroll to
          window.scrollTo({
					  top: scrollTarget.offsetTop - headerHeight,
					  behavior: 'smooth'
					});

        });
	});
}

//add scroll to top btn
const addScrollTop = () => {
	//=> create btn 
	 const scrollBtn = document.createElement('button');
	 scrollBtn.className = 'scroll__top__btn';
	 scrollBtn.textContent = 'Top';

	 //=> append a as child to main
	 main.appendChild(scrollBtn);

}

//show scroll btn
const showScrollBtn = () => {
	const scrollToTopBtn = document.querySelector('.scroll__top__btn');
	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

//scroll to top on click btn
const btnScrollTop = () => {

	document.querySelector('.scroll__top__btn').addEventListener('click', function (event) {

	    scrollToTop();

	});

}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu

//=>call build navbar to execute
buildNavbar();

// Scroll to section on link click
scrollTo();

// Set sections as active
window.addEventListener('scroll', addActiveSection);

//add scroll to top
addScrollTop();

//scroll to top on click
btnScrollTop();









