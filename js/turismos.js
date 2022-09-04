window.addEventListener('load', function () {

  const bigImg = document.getElementById('big-image');
  const imgList = document.getElementsByClassName('gallery-img');

  for (let i = 0; i < imgList.length; i++) {
    imgList[i].addEventListener('click', ShowImage);
  }

  function ShowImage() {
    
  }
});