window.addEventListener('load', function () {

  // Variables

  const header = document.getElementsByTagName('header')[0];
  const bigImgDiv = document.getElementById('big-image-div');
  const bigImg = document.getElementById('big-image');
  const imgList = document.getElementsByClassName('gallery-img');
  const desc = document.getElementById('description');
  const closeBtn = document.getElementById('closeBtn');
  const nextBtn = document.getElementById('rightArrow');
  const prevBtn = document.getElementById('leftArrow');
  const boxDrop = document.getElementById('box');
  const infoList = document.getElementById('info-list');
  
  const numImages = 2;
  let counter = 0;
  let headerSrc = false;

  // Event listeners

  header.addEventListener('click', (e) => {
    if (e.shiftKey && !headerSrc) {
      header.innerHTML = '<a href="https://browsecat.net/other/honda-civic-si-2000-modified-wallpapers" target="_blank">https://browsecat.net/other/honda-civic-si-2000-modified-wallpapers</a>';
      headerSrc = true;
    }
    else if (e.shiftKey && headerSrc) {
      header.innerHTML = '';
      headerSrc = false;
    }
  });

  for (let i = 0; i < imgList.length; i++) {
    imgList[i].addEventListener('click', ShowImage);
    imgList[i].addEventListener('dragstart', (e) => {
      let image = e.target;
      e.dataTransfer.setData('image', image.outerHTML);
    });
  }

  closeBtn.addEventListener('click', CloseImage);
  nextBtn.addEventListener('click', NextImage);
  prevBtn.addEventListener('click', PreviousImage);

  boxDrop.addEventListener('dragenter', (e) => {
    e.preventDefault();
  });

  boxDrop.addEventListener('dragleave', (e) => {
    e.preventDefault();

    boxDrop.style.backgroundColor = 'transparent';
  });

  boxDrop.addEventListener('dragover', (e) => {
    e.preventDefault();

    boxDrop.style.backgroundColor = '#D6FFD6';
  });

  boxDrop.addEventListener('drop', DropImage);


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
    bigImgDiv.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
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
    bigImgDiv.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }


  function DropImage(e) {
    e.preventDefault();

    // Clean up previous sources displayed

    infoList.innerHTML = '';

    // Take the element that is being dragged and copy it into the box
    // To identify it later the id 'image-selected' is added

    boxDrop.innerHTML = e.dataTransfer.getData('image').replace('>', 'id="image-selected">');
    boxDrop.style.backgroundColor = 'transparent';
    
    const selImg = document.getElementById('image-selected');
    
    // Get the sources of the images that are stored in a custom attribute
    // called data-sources.
    // Create a list with the links which are separated by blank spaces

    const srcList = selImg.getAttribute('data-sources').split(' ');
    
    for (let i = 0; i < srcList.length; i++) {
      const newElem = document.createElement('li');
      const newLink = document.createElement('a');
      
      newLink.innerText = srcList[i];
      newLink.setAttribute('href', srcList[i]);
      newLink.setAttribute('target', '_blank');
      
      newElem.innerHTML = newLink.outerHTML;

      infoList.appendChild(newElem);
    }
  }
});