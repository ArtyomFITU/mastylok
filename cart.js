    // Функція для додавання товару до кошику
    function addToCart(item, price) {
    showPopup(); // Показываем всплывающее окно
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ item: item, price: price});
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems(); // Оновлюємо відображення кошику після додавання товару
    }

     // Функція для відображення вспливаючого вікна
     function showPopup() {
      var popup = document.getElementById('popup');
      popup.style.display = 'block';
      setTimeout(function() {
          popup.style.display = 'none';
      }, 2000); // Час відображення вспливаючого вікна у міллісекундах 
      }

    // Функція для видалення товару з кошику
    function removeFromCart(item) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var index = cartItems.findIndex(function(cartItem) {
        return cartItem.item === item;
    });
    if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems(); // Оновлюємо відображення кошику після видалення товару
    }
    }

    // функція для відображення товарів у кошику
    function displayCartItems() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = 'Кошик пустий';
    } else {
        var table = document.createElement('table');
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');
        var trHeader = document.createElement('tr');
        var thName = document.createElement('th');
        thName.textContent = 'Назва';
        var thPrice = document.createElement('th');
        thPrice.textContent = 'Ціна';
        var thActions = document.createElement('th');
        thActions.textContent = 'Дії';
        trHeader.appendChild(thName);
        trHeader.appendChild(thPrice);
        trHeader.appendChild(thActions);
        thead.appendChild(trHeader);

        cartItems.forEach(function(cartItem) {
            var tr = document.createElement('tr');
            var tdName = document.createElement('td');
            tdName.textContent = cartItem.item;
            var tdPrice = document.createElement('td');
            tdPrice.textContent = cartItem.price;
            var tdActions = document.createElement('td');
            var removeButton = document.createElement('button');
            removeButton.textContent = 'Видалити';
            removeButton.addEventListener('click', function() {
                removeFromCart(cartItem.item);
            });
            tdActions.appendChild(removeButton);
            tr.appendChild(tdName);
            tr.appendChild(tdPrice);
            tr.appendChild(tdActions);
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        cartContainer.appendChild(table);
    }
    }



// Викликаємо функцію для відображення товарів при завантаженні сторінки
displayCartItems();


// function submitOrder(event) {
//     event.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
  
//     var name = document.getElementsByName('name')[0].value;
//     var phone = document.getElementsByName('phone')[0].value;
//     var email = document.getElementsByName('email')[0].value;
//     var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
//     var orderData = {
//       name: name,
//       phone: phone,
//       email: email,
//       cartItems: cartItems
//     };
  
//     // Вызываем функцию Google Apps Script для отправки данных в таблицу
//     google.script.run.submitOrderToSheet(orderData);
  
//     // Очищаем корзину
//     localStorage.removeItem('cartItems');
//     displayCartItems();
  
//     // Дополнительные действия, например, показать сообщение о успешном оформлении заказа
//     alert('Заказ успешно оформлен!');
//   }










   // в эту константу помещаем URL развёрнутого веб-приложения Google Apps Script
   const URL_APP =     "https://script.google.com/macros/s/AKfycbxndONMUQNpecdyznLv8peD3SqBuLAff-d9BC2s5_Z-kAdlXcMeeLQhcRB1M_A7hKmV9A/exec";

   // находим форму в документе
   const form = document.querySelector("#form");

   // указываем адрес отправки формы (нужно только в начале примера)
   form.action = URL_APP;

   // вспомогательная функция проверки заполненности формы
   function isFilled(details) {
     const { name, email, phone, } = details;
     if (!name) return false;
     if (!email) return false;
     if (!phone) return false;
     return true;
   }

   // навешиваем обработчик на отправку формы
   form.addEventListener("submit", async (ev) => {
     // отменяем действие по умолчанию
     ev.preventDefault();

     // получаем ссылки на элементы формы
     const name = document.querySelector("[name=name]");
     const email = document.querySelector("[name=email]");
     const phone = document.querySelector("[name=phone]");

     // собираем данные из элементов формы
     let details = {
       name: name.value.trim(),
       email: email.value.trim(),
       phone: phone.value.trim(),
       message: message.value.trim(),
       rule: rule.checked,
     };

     // если поля не заполнены - прекращаем обработку
     if (!isFilled(details)) return;

     // подготавливаем данные для отправки
     let formBody = [];
     for (let property in details) {
       // кодируем названия и значения параметров
       let encodedKey = encodeURIComponent(property);
       let encodedValue = encodeURIComponent(details[property]);
       formBody.push(encodedKey + "=" + encodedValue);
     }
     // склеиваем параметры в одну строку
     formBody = formBody.join("&");

     // выполняем отправку данных в Google Apps
     const result = await fetch(URL_APP, {
       method: "POST",
       headers: {
         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
       },
       cors: "no-cors",
       body: formBody,
     })
       .then((res) => res.json())
       .catch((err) => alert("Ошибка!"))
       // .then((res) => console.log(res));
       
      if( result.type === 'success' ) {
         name.value = '';
         email.value = '';
         phone.value = '';
         message.value = '';
        alert('Спасибо за заявку!')
      }
      if( result.type === 'error' ) {            
        alert(`Ошибка( ${result.errors}`)
      }


   });
  


// // Функция для добавления товара в корзину
// function addToCart(item) {
//   var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//   cartItems.push(item);
//   localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   displayCartItems(); // Обновляем отображение корзины после добавления товара
// }

// // Функция для удаления товара из корзины
// function removeFromCart(item) {
//   var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//   var index = cartItems.indexOf(item);
//   if (index !== -1) {
//       cartItems.splice(index, 1);
//       localStorage.setItem('cartItems', JSON.stringify(cartItems));
//       displayCartItems(); // Обновляем отображение корзины после удаления товара
//   }
// }

// // Функция для отображения товаров в корзине
// function displayCartItems() {
//   var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//   var cartContainer = document.getElementById('cart-items');
//   cartContainer.innerHTML = '';

//   if (cartItems.length === 0) {
//       cartContainer.innerHTML = 'Кошик пустий';
//   } else {
//       var ul = document.createElement('ul');
//       cartItems.forEach(function(item) {
//           var li = document.createElement('li');
//           li.textContent = item;
//           var removeButton = document.createElement('button');
//           removeButton.textContent = 'Удалить';
//           removeButton.addEventListener('click', function() {
//               removeFromCart(item);
//           });
//           li.appendChild(removeButton);
//           ul.appendChild(li);
//       });
//       cartContainer.appendChild(ul);
//   }
// }

// // Вызываем функцию для отображения товаров при загрузке страницы
// displayCartItems();