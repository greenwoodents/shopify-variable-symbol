## Shopify generátor variabilního čísla
Opravdu jednoduchý kus kódu pro generování variabilního čísla na konci objednávajícího procesu.

## Instalace

1. Prihlaste se do administrace Vašeho obchodu běžící na Shopify

2. Přejděte do "settings" dále "checkout" a následě v skeci "Additional content and scripts" vložte tento urtžek kódu níže. Kde:
  * `[[ váš-bankovní-učet ]]` nahraďte za váš realný bankovní učet například `123456789/0100`.
  * `[[ Nazev-brány ]]` nahraďte názvem platebního způsobu u kterého chcete aby se infomrace zobrazily. Název platebního způsobu naléznete v Shopify administraci > "setting" > "Manual Payments". Lze si tam nový způsob platby i vytvořit.

```html
<div class="gateway"
   data-gateway="{{ unique_gateways }}"
   data-show-when="[[ Nazev-brány ]]">
 <h3>Instrukce pro platbu převodem</h3>
 <p>Pošlete peníze na účet: <strong>[[ váš-bankovní-učet ]] </strong>
 Variabilní symbol: <strong>{{ order_number }}</strong></p>
</div>
```

3. Pod předchozí útržek textu vložte ještě tento útržek.


```javascript
<script>
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

ShopifyVarSymbol('.gateway');
</script>
```
