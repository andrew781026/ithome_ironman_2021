function showModal(){

  const modalWrap =  document.querySelector('.pop-up-container');

  const popup =  modalWrap.querySelector('.pop-up-box');

  modalWrap.style.display = 'flex';
  popup.style.transform = 'scale(0)';

  setTimeout(()=>  popup.style.transform = 'scale(1)',0)
}

function closeModal(){

  const modalWrap =  document.querySelector('.pop-up-container');

  const popup =  modalWrap.querySelector('.pop-up-box');

  popup.style.transform = 'scale(0)';

  setTimeout(()=> modalWrap.style.display = 'none',300)
}
