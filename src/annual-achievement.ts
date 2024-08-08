window.Webflow ||= [];
window.Webflow.push(() => {
  const imgUrlBtn = document.querySelectorAll('[img-url]');
  const imgEl = document.querySelector('[img-tab]') as HTMLImageElement;

  imgUrlBtn.forEach((imgbtn) => {
    imgbtn.addEventListener('click', (e) => {
      imgUrlBtn.forEach((el) => {
        //remove active state from other element
        if (el !== imgbtn) {
          el.classList.remove('active');
        }
      });
      //set active state on btn
      imgbtn.classList.add('active');
      //get the link attr
      const imgLink = imgbtn.getAttribute('img-url') as string;
      imgEl.src = imgLink;
    });
  });
});
