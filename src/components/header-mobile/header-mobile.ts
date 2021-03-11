const popupMenu: HTMLElement = document.querySelector("#popup-menu-mobile");
const openPopupMenu: HTMLElement = document.querySelector(".menu-trigger-button");
const closePopupMenu: HTMLElement = document.querySelector("#popup-menu-mobile__close");
const body: HTMLElement = document.querySelector('body');
const bodyDefaultOverflow = body.style.overflow;

if (popupMenu) {
  openPopupMenu.addEventListener('click', () => {
    popupMenu.classList.add('active');
    body.style.overflow = 'hidden';
  })
  closePopupMenu.addEventListener('click', () => {
    popupMenu.classList.remove('active');
    body.style.overflow = bodyDefaultOverflow;
  })
}
