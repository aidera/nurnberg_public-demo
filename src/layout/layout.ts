import {tns} from "../../node_modules/tiny-slider/src/tiny-slider";
import "./layout.sass";

import "../components/header/header";
import "../components/header-quote/header-quote";
import "../components/header-mobile/header-mobile";
import "../components/footer/footer";
import "../components/sidebar/sidebar";
import "../components/post-card/post-card";
import "../components/post-card_wide/post-card_wide";
import "../components/with-the-help/with-the-help";
import "../components/other-posts/other-posts";

import "../pages/index/index";
import "../pages/category/category";
import "../pages/search/search";
import "../pages/post/post";
import "../pages/sitemap/sitemap";


const menus: NodeListOf<HTMLDivElement> = document.querySelectorAll(".menu-block");

if (menus) {
  menus.forEach((menuEl, i) => {
    const trigger = menuEl.querySelector(".menu-list__trigger");
    const list = menuEl.querySelector(".menu-list");

    const toggleActiveClass = () => {
      if (list.classList.contains("active")) {
        list.classList.remove("active");
      } else {
        list.classList.add("active");
      }
    }

    trigger.addEventListener("click", toggleActiveClass);
    list.addEventListener("click", toggleActiveClass);
  });
}


const pageSlider: NodeListOf<HTMLDivElement> = document.querySelectorAll(".slider");

if (pageSlider) {

  pageSlider.forEach((sliderEl, i) => {

    sliderEl.classList.add(`slider-${i + 1}`);

    const slider = tns({
      container: `.slider-${i + 1} .slide-container`,
      items: 1,
      slideBy: "page",
      autoplay: true,
      mouseDrag: true,
      swipeAngle: false,
      speed: 400,
      controlsText: ["<img src='/images/slide-prev.svg' alt='prev slide' />", "<img src='/images/slide-next.svg' alt='next slide' />"],
      autoplayText: ["", ""],
    });

    const slides = document.querySelector(`.slider-${i + 1} .slider-caption__slides`);

    if (slides) {
      const changeItemNumber = () => {
        slides.querySelector(".current").innerHTML = String(slider.getInfo().navCurrentIndex + 1);
        slides.querySelector(".all").innerHTML = String(slider.getInfo().slideCount);
      };
      changeItemNumber();
      slider.events.on("indexChanged", changeItemNumber);
    }
  });


}

