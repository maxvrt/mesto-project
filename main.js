(()=>{"use strict";function e(e,t){e.classList.add(t),e.classList.remove("link"),e.setAttribute("disabled","")}var t=function(t,o,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?function(e,t){e.classList.remove(t),e.classList.add("link"),e.removeAttribute("disabled")}(o,r.inactiveButtonClass):e(o,r.inactiveButtonClass)},o={baseUrl:"https://nomoreparties.co/v1/plus-cohort-8",headers:{authorization:"22ea861c-3f58-49dd-8e52-eb0909a1b5c2","Content-Type":"application/json"}};function r(){return fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){return e})).catch((function(e){console.log("Ошибка. Запрос не выполнен: ",e)}))}var n=fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){return e})).catch((function(e){console.log("Ошибка. Запрос не выполнен: ",e)})),c=document.querySelector(".popup_img"),i=document.querySelector("#card-template").content,u=c.querySelector(".popup__desc"),a=c.querySelector(".popup__photo"),s=document.querySelector(".popup__close.popup_profile"),l=document.querySelector(".profile__edit"),d=document.querySelector(".popup_profile"),p=document.querySelector(".profile__name"),m=document.querySelector(".profile__desc"),_=document.querySelector(".profile__photo"),f=document.querySelector(".form_profile"),v=document.querySelector(".form__item_el_name"),y=document.querySelector(".form__item_el_desc"),S=document.querySelector(".photos-grid"),q=document.querySelector(".popup__close.popup_img"),h=document.querySelector(".popup__close.popup_place"),L=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_place"),E=document.querySelector(".form_place"),g=document.querySelector(".form__item_el_place"),k=document.querySelector(".form__item_el_img-place"),C={formSelector:".form",formItemSelector:".form__item",formButtonSelector:".form__button",inactiveButtonClass:"form__button_inactive",itemErrorClass:"form__item_type_error",errorActiveClass:"form__item-error_active"};function A(e){e.classList.add("popup_opened"),document.addEventListener("keydown",j)}function x(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",j),console.log("удалили обработчик Esc")}function B(e,t){e.target.classList.contains("popup_opened")&&!e.target.classList.contains("popup__popup-box")&&x(t)}function j(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");t&&x(t)}}function D(e,t){var o=i.querySelector(".photos-grid__item").cloneNode(!0),r=o.querySelector(".photos-grid__heart"),n=o.querySelector(".photos-grid__delete"),s=o.querySelector(".photos-grid__img");return s.setAttribute("src",e),s.setAttribute("alt",t),o.querySelector(".photos-grid__city").textContent=t,function(e){e.addEventListener("click",(function(){e.classList.toggle("photos-grid__heart_active")}))}(r),function(e){e.addEventListener("click",(function(){e.closest("div").remove()}))}(n),function(e){e.addEventListener("click",(function(){var t,o;t=e.getAttribute("src"),o=e.getAttribute("alt"),a.setAttribute("src",t),a.setAttribute("alt",o),u.textContent=o,A(c)}))}(s),o}n.forEach((function(e){S.append(D(e.link,e.name))}));var U=r();_.src=U.avatar,p.textContent=U.name,m.textContent=U.about,function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(o){o.addEventListener("submit",(function(e){e.preventDefault()})),function(e,o){var r=Array.from(e.querySelectorAll(o.formItemSelector)),n=e.querySelector(o.formButtonSelector);t(r,n,o),r.forEach((function(c){c.addEventListener("input",(function(){!function(e,t,o){t.validity.valid?function(e,t,o){var r=e.querySelector(".form__item-error_item_".concat(t.id));t.classList.remove(o.itemErrorClass),r.classList.remove(o.errorActiveClass),r.textContent=""}(e,t,o):function(e,t,o,r){var n=e.querySelector(".form__item-error_item_".concat(t.id));t.classList.add(r.itemErrorClass),n.textContent=o,n.classList.add(r.errorActiveClass)}(e,t,t.validationMessage,o)}(e,c,o),t(r,n,o)}))}))}(o,e)}))}(C),s.addEventListener("click",(function(){x(d)})),l.addEventListener("click",(function(){!function(e){A(e);var t=r();v.value=t.name,y.value=t.about}(d)})),f.addEventListener("submit",(function(e){e.preventDefault();var t=v.value,o=y.value;p.textContent=t,m.textContent=o,x(d)})),h.addEventListener("click",(function(){x(b)})),L.addEventListener("click",(function(){A(b)})),E.addEventListener("submit",(function(t){t.preventDefault();var o=t.target.querySelector(".form__button");S.prepend(D(k.value,g.value)),x(b),e(o,C.inactiveButtonClass),k.value="",g.value=""})),q.addEventListener("click",(function(){x(c)})),d.addEventListener("click",(function(e){B(e,d)})),b.addEventListener("click",(function(e){B(e,b)})),c.addEventListener("click",(function(e){B(e,c)}))})();