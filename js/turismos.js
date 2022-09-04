window.addEventListener('load', function () {

  const bigImgDiv = document.getElementById('big-image-div');
  const bigImg = document.getElementById('big-image');
  const imgList = document.getElementsByClassName('gallery-img');

  for (let i = 0; i < imgList.length; i++) {
    imgList[i].addEventListener('click', ShowImage);
  }

  function ShowImage(e) {
    e.preventDefault();

    const selectedImg = e.target;
    
    bigImg.setAttribute('src', selectedImg.getAttribute('src'));
    
    bigImgDiv.style.display = 'block';
  }
});