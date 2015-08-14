function ShopifyVarSymbol(selector) {
  'use strict';

  if(!selector){
    throw "Missing Selector";
    return false;
  }

  [].forEach.call(document.querySelectorAll(selector), function(el,i,a) {
    var gateway = el.getAttribute('data-gateway');
    var when = el.getAttribute('data-show-when');

    if (gateway && when) {
      gateway = gateway.toLowerCase().trim().replace(' ', '');
      when = when.toLowerCase().trim().replace(' ', '');

      if(gateway === when) {
        el.removeAttribute('style');
      } else {
        el.setAttribute('style', 'opacity: 0; visibility: hidden; height: 0;');
      }
    } else { return false };
  });
};
