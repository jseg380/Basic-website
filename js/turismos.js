window.addEventListener('load', function () {

  // Variables

  const bigImgDiv = document.getElementById('big-image-div');
  const bigImg = document.getElementById('big-image');
  const imgList = document.getElementsByClassName('gallery-img');
  const desc = document.getElementById('description');
  const closeBtn = document.getElementById('closeBtn');
  const nextBtn = document.getElementById('rightArrow');
  const prevBtn = document.getElementById('leftArrow');
  
  const numImages = 2;
  let counter = 0;

  // Event listeners

  for (let i = 0; i < imgList.length; i++) {
    imgList[i].addEventListener('click', ShowImage);
  }

  closeBtn.addEventListener('click', CloseImage);
  nextBtn.addEventListener('click', NextImage);
  prevBtn.addEventListener('click', PreviousImage);
  

  // Functions

  function ShowImage(e) {
    e.preventDefault();

    const selectedImg = e.target;
    counter = 1;
    
    const imgSrc = selectedImg.getAttribute('src').replace('_small', '');

    bigImg.setAttribute('src', imgSrc);
    bigImg.setAttribute('alt', selectedImg.getAttribute('alt'));
    bigImg.setAttribute('title', selectedImg.getAttribute('title'));
    desc.innerText = bigImg.getAttribute('title');
    
    bigImgDiv.style.display = 'grid';
    bigImgDiv.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }

  function CloseImage(e) {
    e.preventDefault();

    bigImgDiv.style.display = 'none';
    bigImg.setAttribute('src', '');
    bigImg.setAttribute('alt', '');
    bigImg.setAttribute('title', '');
  }

  function NextImage() {
    // Check if there is a next, if not go back to the first one
    // According to this https://stackoverflow.com/q/56984284
    // "Let me clarify. JavaScript in the client has NO ACCESS to the filesystem"
    // An answer to that question suggests using node.js as vanilla js can't
    // access to the filesystem
    // So I will arbitrarily decide how many photos there will be for each car 
    // (there will be the same for all of them) and put it in a global constant

    let newSrc = '';

    if (counter === numImages) {
      newSrc = bigImg.getAttribute('src').replace(`_${counter}.jpg`, `_${1}.jpg`);
      counter = 1;
    }
    else {
      newSrc = bigImg.getAttribute('src').replace(`_${counter}.jpg`, `_${counter + 1}.jpg`);
      counter = counter + 1;
    }

    bigImg.setAttribute('src', newSrc);
  }

  function PreviousImage() {
    let newSrc = '';

    if (counter === 1) {
      newSrc = bigImg.getAttribute('src').replace(`_${counter}.jpg`, `_${numImages}.jpg`);
      counter = numImages;
    }
    else {
      newSrc = bigImg.getAttribute('src').replace(`_${counter}.jpg`, `_${counter - 1}.jpg`);
      counter = counter - 1;
    }

    bigImg.setAttribute('src', newSrc);
  }
});