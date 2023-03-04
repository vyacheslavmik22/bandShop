document.addEventListener("DOMContentLoaded", () => {
  

  const slider = tns({
    container: '.carousel__slider',
    items: 1,
    slideBy: 'page',
    autoplay: true,
    controls: false,
    nav: false
    // responsive: {
    //     1200: {
    //       edgePadding: 0,
    //       gutter: 0,
    //       items: 1,
    //     },
    //     992: {
    //       gutter: 30
    //     },
    //     768: {
    //       items: 1
    //     }
    //   }
  });

  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });
  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });


  //change product info in tabs

  const details = document.querySelectorAll(".catalog-item__link");
  const detailsBack = document.querySelectorAll(".catalog-item__link-back");
  const mainInfo = document.querySelectorAll(".catalog-item__content");
  const textInfo = document.querySelectorAll(".catalog-item__list");
  const tab = document.querySelectorAll(".catalog__tab");
  const tabContent = document.querySelectorAll(".catalog__content");

  function changeTabsContent(linkTriggerMain, linkTriggerBack, productInfo, productDescr) {
    linkTriggerBack.forEach((item, num) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        productDescr[num].classList.remove("catalog-item__list_active");
        productInfo[num].classList.add("catalog-item__content_active");
      });
    })

    linkTriggerMain.forEach((item, num) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        productInfo[num].classList.remove("catalog-item__content_active");
        productDescr[num].classList.add("catalog-item__list_active");
      });
    })
  }

  const changeTab = () => {
    tab.forEach((item, num) => {
      item.addEventListener('click', () => {
        tab.forEach((i) => {
          i.classList.remove("catalog__tab_active");
        })
        tabContent.forEach((k) => {
          k.classList.remove("catalog__content_active");
        })
        item.classList.add("catalog__tab_active");
        tabContent[num].classList.add("catalog__content_active");
        item.classList.add("catalog__tab_active");
      })
    })
  }

  const displayTabContent = () => {

  }




  changeTabsContent(details, detailsBack, mainInfo, textInfo);
  changeTab();


//=========MODALS===========

const modalWindowOverlay = document.querySelector(".overlay"),
      btnConsultation = document.querySelectorAll("[data-call]"),
      btnBuy = document.querySelectorAll("[data-buy]"),
      modalWindowConsultation = document.querySelector("#consultation"),
      modalWindowBuy = document.querySelector("#order"),
      modalWindowThanks = document.querySelector("#done"),
      btnCloseModalWindow = document.querySelectorAll(".modal__close"),
      productNameTab = document.querySelectorAll(".catalog-item__subtitle"),
      productNameModal = document.querySelector(".modal__description-product");


const openModalWindowConsultation = () => {
  btnConsultation.forEach((item) => {
    item.addEventListener('click', () => {
      console.log("asdasdasdas");
      modalWindowOverlay.style.display = "block";
      document.body.style.overflow = "hidden";
      modalWindowOverlay.classList.add("animate__animated", "animate__fadeIn", "animate__faster");
      modalWindowConsultation.style.display = "block";
      modalWindowConsultation.classList.add("animate__animated", "animate__fadeIn", "animate__faster");
    });
  });
}

const openModalWindowBuy = () => {
  btnBuy.forEach((item, num) => {
    item.addEventListener('click', () => {
      productNameModal.textContent = productNameTab[num].textContent;
      modalWindowOverlay.style.display = "block";
      document.body.style.overflow = "hidden";
      modalWindowOverlay.classList.add("animate__animated", "animate__fadeIn", "animate__faster");
      modalWindowBuy.style.display = "block";
      modalWindowBuy.classList.add("animate__animated", "animate__fadeIn", "animate__faster");
    });
  });
}

const closeModalWindow = () => {
  btnCloseModalWindow.forEach((item) => {
    item.addEventListener('click', () => {
      modalWindowOverlay.style.display = "none";
      modalWindowConsultation.style.display = "none";
      modalWindowBuy.style.display = "none";
      document.body.style.overflow = "visible";
    });
  })
}

modalWindowOverlay.addEventListener('click', (e) => {
  if (e.target == modalWindowOverlay) {
    modalWindowOverlay.style.display = "none";
    modalWindowConsultation.style.display = "none";
    modalWindowBuy.style.display = "none";
    document.body.style.overflow = "visible";
  }

});

openModalWindowConsultation();
openModalWindowBuy();
closeModalWindow();


const inputNumber = document.querySelectorAll(".phone");
const inputName = document.querySelectorAll(".clientName");

const enterValidInfoInForm = () => {
  inputNumber.forEach((item) => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/g, "");
    })
  })

  inputName.forEach((item) => {
    item.addEventListener("input", () => {
      item.value = item.value.replace(/\d/g, "");
    });
  })

}

enterValidInfoInForm();


//=======phone mask=======
const phoneInput = document.querySelectorAll(".phone");

phoneInput.forEach((item) => {
  item.addEventListener('input', function (e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] + '-' + x[4] : '');
  });
});



//====FORM data=====



const thanksWindowModal = () => {
  modalWindowConsultation.style.display = "none";
  modalWindowBuy.style.display = "none";
  modalWindowThanks.style.display = "block";
  setTimeout(() => {
    modalWindowThanks.style.display = "none";
    modalWindowOverlay.style.display = "none";
  }, 4000);
};
const thanksWindowPage = () => {
  modalWindowOverlay.style.display = "block";
  modalWindowThanks.style.display = "block";
  setTimeout(() => {
    modalWindowThanks.style.display = "none";
    modalWindowOverlay.style.display = "none";
  }, 4000);
};

const forms = document.querySelectorAll("form");

const postData = (url, data) => {
  let res = fetch(url, {
    method: "POST",
    body: data
  });

  return res;
}



  forms.forEach((item) => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(item);
      const url = "../mailer/smart.php";

      postData(url, formData)
        .then(res => {
          console.log(res);
          if (item.id === "pageForm") {
            thanksWindowPage();
          } 
          thanksWindowModal();
        })
        .catch(() => {
          console.log("something wrong");
        })
        .finally(() => {
          item.reset();
        })
    });
  })



//=======SCROLLING UP========

const btnGoUp = document.querySelector(".pageup");

window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > 1600){
    btnGoUp.style.display = "block";
    btnGoUp.classList.add("animate__animated", "animate__fadeIn");
  } else {
    btnGoUp.style.display = "none";
    btnGoUp.classList.remove("animate__animated", "animate__fadeIn");
    
  }
});


// const feedback = document.querySelectorAll(".feedbacks__item");

// feedback.forEach((item) => {
//   window.addEventListener('scroll', () => {
//     if (document.documentElement.scrollTop > 2700){
//       item.style.display = "flex";
//       item.classList.add("animate__animated", "animate__fadeInUp");
//     } else {
//       item.style.display = "none";   
//     }
//   });
// })

new WOW().init();

});
