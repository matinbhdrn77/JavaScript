'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// const header = document.querySelector('.header');

// const message = document.createElement('div');
// message.classList.add('cookie-message')
// message.innerHTML = `This is what it has to be <button class="btn btn--close--cookie">Got It!</button>"`

// header.append(message);
// document.querySelector('.btn--close--cookie').addEventListener('click', function () {
//   message.remove()
// })

// message.style.backgroundColor = '#38383d';
// message.style.width = '100%';
// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', "blue")

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // })

  section1.scrollIntoView({ behavior: 'smooth' })
})

const alertH1 = function () {
  alert("You do some shit")
}
const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alertH1)
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000)


document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})


console.log(h1.nextSibling)

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab')
  // Guard Clause
  if (!clicked) return

  // Remove 
  tabs.forEach(e => e.classList.remove('operations__tab--active'))
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))

  clicked.classList.add('operations__tab--active')
  console.log(clicked)
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

// link hover
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  const link = e.target;
  if (link.classList.contains('nav__link')) {
    const links = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    links.forEach(el => {
      if (el !== link) el.style.opacity = this
    })
    logo.style.opacity = this
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// sticky nav (Bad Practice)
// const initCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function(e) {
//   if (window.scrollY > initCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky')
// })

// sticky navigation with intersaction api
// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry)
//   })
// }
// const obsOptions = {
//   root: null,
//   treshold: 0.1,
// }
// const observer = new  IntersectionObserver(obsCallback, obsOptions)
// observer.observe(section1)
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height
const stickyNav = function(entries) {
  const [entry] = entries
  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  treshold: 0,
  rootMargin: `-${navHeight}px`
})
headerObserver.observe(header)

// Show sections
const sections = document.querySelectorAll('.section')

const revealSection = function (entries, observer) {
  const [entry] = entries
  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectoinObserver = new IntersectionObserver(revealSection, {
  root:null,
  threshold:0.15,
})

sections.forEach(function(section) {
  sectoinObserver.observe(section);
  // section.classList.add('section--hidden')
})

// lazy image 
const lazyImages = document.querySelectorAll('img[data-src]')

const loadimg = function(entries, observer) {
  const [entry] = entries
  console.log(observer)


  if (!entry.isIntersecting) return
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadimg, {
  root:null,
  treshold:0
})

lazyImages.forEach(img => imgObserver.observe(img))

// slider
const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnright = document.querySelector('.slider__btn--right')

const slider = document.querySelector('.slider')
slider.style.transform = `scale(0.25)`
slider.style.overflow = 'visible'

const goToSlide = function(slide) {
  slides.forEach((slide, i) => 
  slide.style.transform = `translateX(${(i - curSlide)*100}%)`)
}

goToSlide(0)

const maxSlides = slides.length
let curSlide = 0

const nextSlide = function() {
  if (curSlide === maxSlides - 1) curSlide = 0
  else curSlide++;

  goToSlide(curSlide)
}

const prevSlide = function() {
  if (curSlide === 0) curSlide = maxSlides - 1
  else curSlide--;

  goToSlide(curSlide)
}


btnright.addEventListener('click', nextSlide)
btnright.addEventListener('click', prevSlide)