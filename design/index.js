const menuopener = document.querySelector(".mainHeader .menuopener");
const menu = document.querySelector(".mainHeader .navWrapper");
const menucloser = document.querySelector(".mainHeader .menucloser");
const carticon = document.querySelector(".mainHeader .otherinfo .cartWrapper");
const cartPopup = document.querySelector(".mainHeader .otherinfo .carts");
const cartInnerWrapper = document.querySelector('.mainHeader .otherinfo .rest .cartItem')
const cartItemNumber = document.getElementById("cartItemNumber")
const cartBanner = document.querySelector('.mainHeader .otherinfo .cartWrapper .cartIndicator')
const cartTotal = document.getElementById('cartTotal')
const imageSection = document.querySelector('.main .imageSection')
const imageWrapperParent = document.querySelector(".main .imageSection .imageContainer");
const cancelpopup = document.querySelector('.main .imageSection .cancelpopup')

const back_btn = document.querySelector(".main .imageSection .imageButton.back");
const forward_btn = document.querySelector(".main .imageSection .imageButton.forward");
const reduceCartIcon = document.querySelector('.main .cartMonitor .counter .minusIcon')
const increaseCartIcon = document.querySelector('.main .cartMonitor .counter .plusIcon')
const addtocart = document.querySelector('.main .toCart')
const sneakerAmount = document.getElementById('itemcount')
const thumbnailParent = document.querySelector('.main .imageSection .templateImage')
const thumbnailChildrenArray = [...thumbnailParent.children]
const price = 125
let localdata = getOrSetData()
if (!localdata) {
    localdata = 0
    localdata = getOrSetData(3)
}
function getOrSetData(action) {
    if (action) {
        localStorage.setItem('sneaker.amount', localdata)
    }
    return localStorage.getItem('sneaker.amount')
}
updateCartInfo()
async function updateCartInfo(addToCart = false) {
    getOrSetData(2)
    if (localdata=="0") {
         cartBanner.classList.remove('show')
         cartInnerWrapper.classList.remove('show')
    }
    if(addToCart) {
        cartBanner.classList.add('show')
        cartInnerWrapper.classList.add('show')
    }
    sneakerAmount.innerText = localdata
    cartBanner.innerText = localdata
    cartItemNumber.innerText = localdata
    cartTotal.innerText = price * localdata
}
function removeHightlight() {
  thumbnailChildrenArray.forEach((subchild) => {
    subchild.classList.remove("highlight");
  });
}
let currentImageIndex = 0;

menuopener.addEventListener("click", () => {
  menu.classList.add("inview");
});
menucloser.addEventListener("click", () => {
  menu.classList.remove("inview");
});
carticon.addEventListener("click", () => {
  cartPopup.classList.toggle("show");
});
let cartTimer = null
carticon.addEventListener("mouseenter", () => {
  clearTimeout(cartTimer)
  cartPopup.classList.add("show");
});
carticon.addEventListener("mouseleave", () => {
  cartTimer = setTimeout(() => {
    cartPopup.classList.remove("show");
  }, 500)
});
back_btn.addEventListener("click", () => {
  if (currentImageIndex !== 0) {
    imageWrapperParent.children[--currentImageIndex].scrollIntoView();
    removeHightlight()
    thumbnailChildrenArray[currentImageIndex].scrollIntoView()
    thumbnailChildrenArray[currentImageIndex].classList.add('highlight')
    }
});
forward_btn.addEventListener("click", () => {
    if (currentImageIndex !== imageWrapperParent.children.length - 1) {
    imageWrapperParent.children[++currentImageIndex].scrollIntoView();
    removeHightlight();
      thumbnailChildrenArray[currentImageIndex].scrollIntoView();
      thumbnailChildrenArray[currentImageIndex].classList.add("highlight");
    }
});
reduceCartIcon.addEventListener('click', () => {
    if (sneakerAmount.innerText === '0') {
        return
    }
  localdata = parseInt(sneakerAmount.innerText) - 1
  sneakerAmount.innerText = localdata
    //updateCartInfo()
    
})
increaseCartIcon.addEventListener('click', () => {
  localdata = parseInt(sneakerAmount.innerText) + 1
  sneakerAmount.innerText = localdata
    //updateCartInfo()
})
addtocart.addEventListener('click', () => {
    localdata = parseInt(sneakerAmount.innerText)
    updateCartInfo(true)
})
let thumbnailChildIndex = -1
thumbnailChildrenArray.forEach(child => {
  let childIndex = ++thumbnailChildIndex
  child.addEventListener('click', () => {
    removeHightlight()
    child.classList.add('highlight')
    imageWrapperParent.children[childIndex].scrollIntoView()
    currentImageIndex = childIndex
  })
})
imageWrapperParent.addEventListener('click', () => {
  imageSection.classList.add('popup')
})
cancelpopup.addEventListener('click', () => {
  imageSection.classList.remove('popup');
})