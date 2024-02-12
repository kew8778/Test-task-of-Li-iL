'use strict';

const priceList = document.querySelector('.prizeList');
showList(priceList);

// вывод списка на страницу
async function showList(parent) {
  const arr = (await getResponceServer()).services; // массив 'services' из данных серевера
  const lists = getObjLists(arr); // объект отсортированных списков
  parent.appendChild(getList(lists)); // вывод списка на страницу
}

// получаем DOM-дерево списка
function getList(obj, key = 'null') {
  const ul = document.createElement('ul');

  if (key > 0) {
    ul.classList.add('hidden'); // скрываем внутренние списки
  }

  for (let i = 0; i < obj[key].length; i++) {
    const li = document.createElement('li');
    const item = obj[key][i];

    if (item.node) {
      li.textContent = item.name;
      li.classList.add('arrowRight');
      addEvents(li); // добавление события клика
      ul.appendChild(li);
      ul.appendChild(getList(obj, String(item.id))); // добавление внутренних списков
    } else {
      li.textContent = `${item.name} (${item.price})`;
      ul.appendChild(li);
    }
  }

  return ul;
}

// преобразуем данные в объект отсортированных списков 
// return {'id': [{объект с head == id}, ...], ...}
function getObjLists(arr) {
  const lists = {};

  for (let i = 0; i < arr.length; i++) {
    const key = String(arr[i].head);

    if ( !(lists[key]) ) {
      lists[key] = [];
    }

    lists[key].push(arr[i]);
  }

  for (let key in lists) {
    lists[key].sort((a, b) => {
      if (a.sorthead > b.sorthead) {
        return 1;
      } else {
        return -1;
      }
    })
  }

  return lists;
}

// добавление обработчика клика узловым пунктам списка
function addEvents(elem) {
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
