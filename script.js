'use strict';

showList();

/**
 * Вывод списка на страницу
 */
async function showList() {
  const arr = (await getResponceServer()).services; // массив 'services' из данных серевера
  const lists = getObjLists(arr); // объект отсортированных списков
  const priceList = document.querySelector('.prizeList'); // родительский блок списка
  priceList.appendChild(getList(lists)); // вывод списка на страницу
}

/**
 * Получение DOM-дерева списка
 * @param obj {Object.<string, Array.Object>} Отсортированные списки {'head': [{}]}
 * @param [key='null'] {string} id узлового элемента
 * @returns HTMLUListElement
 */
function getList(obj, key = 'null') {
  const ul = document.createElement('ul');

  for (let i = 0; i < obj[key].length; i++) {
    const li = document.createElement('li');
    const span = document.createElement('span');

    const item = obj[key][i];

    if (item.node) {
      span.textContent = item.name;

      const arrow = getArrowRight(); // стрелка перед span
      li.appendChild(arrow);
      li.appendChild(span);
      li.classList.add('arrowRight');

      addEvents(arrow); // добавление события клика на стрелку

      ul.appendChild(li);
      ul.appendChild(getList(obj, String(item.id))); // добавление внутренних списков
    } else {
      span.textContent = `${item.name} (${item.price})`;

      li.appendChild(span);
      ul.appendChild(li);
    }
  }

  return ul;
}

/**
 * Преобразование данных
 * @param arr {Array.Object} - массив 'services' из данных API
 * @returns {Object.<string, Array.Object>} - {'id': [{объект с head == id}, ...], ...}
 */
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

/**
 * Обработчик клика узловых пунктов
 * @param elem {SVGSVGElement} - стрелка SVG
 */
function addEvents(elem) {
  elem.addEventListener('click', function() {
    this.parentElement.classList.toggle('arrowDown');
  });
}

/**
 * Получение SVG-стрелки
 * @returns {SVGSVGElement}
 */
function getArrowRight() {
  const xmlns = 'http://www.w3.org/2000/svg';
  const width = '10px'; // ширина svg
  const height = '10px'; // высота svg
  const stroke = '#a6a6a6'; // цвет стрелки

  const svg = document.createElementNS(xmlns, 'svg');
  svg.setAttributeNS(null, 'viewBox', '0 0 100 100');
  svg.setAttributeNS(null, 'width', width);
  svg.setAttributeNS(null, 'height', height);

  const polyline = document.createElementNS(xmlns, 'polyline');
  polyline.setAttributeNS(null, 'points', '30 10 70 50 30 90');
  polyline.setAttributeNS(null, 'stroke-width', '15px');
  polyline.setAttributeNS(null, 'fill', 'transparent');
  polyline.setAttributeNS(null, 'stroke', stroke);

  svg.appendChild(polyline);

  return svg;
}

/**
 * Запрос на сервер (имитация)
 * @returns {Promise<void>}
 */
async function getResponceServer() {
  const response = await setResponceServer(); // await fetch(url запроса); - если GET
  const res = await JSON.parse(response); // await response.json();

  return res;
}

/**
 * Ответ сервера (для тестинга)
 * @returns {Promise<void>} JSON
 */
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
