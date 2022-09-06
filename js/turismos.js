window.addEventListener('load', function () {

  const bigImgDiv = document.getElementById('big-image-div');
  const bigImg = document.getElementById('big-image');
  const imgList = document.getElementsByClassName('gallery-img');
  const desc = document.getElementById('description');
  const closeBtn = document.getElementById('closeBtn');

  // Event listeners

  for (let i = 0; i < imgList.length; i++) {
    imgList[i].addEventListener('click', ShowImage);
  }

  closeBtn.addEventListener('click', CloseImage);
  

  // Functions

  function ShowImage(e) {
    e.preventDefault();

    const selectedImg = e.target;
    
    const imgSrc = selectedImg.getAttribute('src').replace('_small', '');

    bigImg.setAttribute('src', imgSrc);
    bigImg.setAttribute('alt', selectedImg.getAttribute('alt'));
    bigImg.setAttribute('title', selectedImg.getAttribute('title'));
    desc.innerText = bigImg.getAttribute('title');
    
    bigImgDiv.style.display = 'grid';
    bigImg.scrollIntoView({behavior: 'smooth'});
  }

  function CloseImage(e) {
    e.preventDefault();

    bigImgDiv.style.display = 'none';
    bigImg.setAttribute('src', '');
    bigImg.setAttribute('alt', '');
    bigImg.setAttribute('title', '');
  }
});