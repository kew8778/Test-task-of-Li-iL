'use strict';

const priceList = document.querySelector('.prizeList');
showList(priceList);

// вывод списка на страницу
async function showList(parent) {
  let arr = (await getResponceServer()).services;
  parent.appendChild(getList(arr));
}

// формирование списка из массива данных
function getList(arr, id = null) {
  let list = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].head === id) {
      list.push(arr[i]);
    }
  }

  list.sort((a, b) => {
    if (a.sorthead > b.sorthead) {
      return 1;
    } else {
      return -1;
    }
  })

  let ul = document.createElement('ul');

  if (id) {
    ul.classList.add('hidden');
  }

  for (let i = 0; i < list.length; i++) {
    let li = document.createElement('li');

    if (list[i].node) {
      li.textContent = list[i].name;
      ul.appendChild(li);
      ul.appendChild(getList(arr, list[i].id));
      modItem(li);
    } else {
      li.textContent = `${list[i].name} (${list[i].price})`;
      ul.appendChild(li);
    }
  }

  return ul;
}

// модификация узловых пунктов списка
function modItem(elem) {
  elem.classList.add('arrowRight');

  elem.addEventListener('click', function() {
    this.classList.toggle('arrowRight');
    this.classList.toggle('arrowDown');
    this.nextElementSibling.classList.toggle('hidden');
  });
}

// имитация получения данных с сервера
async function getResponceServer() {
  let response = await setResponceServer(); // await fetch(url запроса); - если GET
  let res = await JSON.parse(response); // await response.json();

  return res;
}

// заглушка ответа сервера (данные в JSON)
function setResponceServer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.stringify(
        {
          "services": [
            {
              "id": 101,
              "head": 2,
              "name": "Лечение кариеса",
              "node": 1,
              "price": 0.0,
              "sorthead": 1
            },
            {
              "id": 102,
              "head": 101,
              "name": "Пломбы",
              "node": 1,
              "price": 0.0,
              "sorthead": 30
            },
            {
              "id": 103,
              "head": 102,
              "name": "Фотополимер",
              "node": 0,
              "price": 1000.0,
              "sorthead": 20
            },
            {
              "id": 1,
              "head": null,
              "name": "Проф.осмотр",
              "node": 0,
              "price": 100.0,
              "sorthead": 20
            },
            {
              "id": 2,
              "head": null,
              "name": "Хирургия",
              "node": 1,
              "price": 0.0,
              "sorthead": 10
            },
            {
              "id": 3,
              "head": 2,
              "name": "Удаление зубов",
              "node": 1,
              "price": 0.0,
              "sorthead": 10
            },
            {
              "id": 4,
              "head": 3,
              "name": "Удаление зуба",
              "node": 0,
              "price": 800.0,
              "sorthead": 10
            },
            {
              "id": 5,
              "head": 3,
              "name": "Удаление 8ого зуба",
              "node": 0,
              "price": 1000.0,
              "sorthead": 30
            },
            {
              "id": 6,
              "head": 3,
              "name": "Удаление осколка зуба",
              "node": 0,
              "price": 2000.0,
              "sorthead": 20
            },
            {
              "id": 7,
              "head": 2,
              "name": "Хирургические вмешательство",
              "node": 0,
              "price": 200.0,
              "sorthead": 10
            },
            {
              "id": 8,
              "head": 2,
              "name": "Имплантация зубов",
              "node": 1,
              "price": 0.0,
              "sorthead": 20
            },
            {
              "id": 9,
              "head": 8,
              "name": "Коронка",
              "node": 0,
              "price": 3000.0,
              "sorthead": 10
            },
            {
              "id": 10,
              "head": 8,
              "name": "Слепок челюсти",
              "node": 0,
              "price": 500.0,
              "sorthead": 20
            }
          ]
        }
      ));
    }, 100);
  });
}
