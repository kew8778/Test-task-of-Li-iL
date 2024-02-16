'use strict';

showList();

/**
 * Вывод списка на страницу
 */
async function showList() {
  const arr = (await getResponceServer('/data.json')).services; // массив 'services' из данных серевера
  const lists = getObjLists(arr); // объект отсортированных списков
  const priceList = document.querySelector('.prizeList'); // родительский блок списка

  // ниже нужно переделать
  const ul = document.createElement('ul');
  priceList.appendChild(ul);
  getList(lists, ul); // вывод списка на страницу
}

/**
 * Получение DOM-дерева списка
 * @param obj {Object.<string, Array.Object>} Отсортированные списки {'head': [{}]}
 * @param parent {HTMLUListElement} - DOM-элемент ul
 * @param [key='null'] {string} id узлового элемента
 * @param [nesting=0] {Number} - вложенность списка
 */
function getList(obj, parent, key = 'null', nesting = 0) {
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
      li.style.paddingLeft = nesting * 7 + 'px';
      parent.appendChild(li);

      const ul = document.createElement('ul');
      parent.appendChild(ul);

      addEvents(arrow, obj, ul, String(item.id), nesting + 1); // добавление события клика на стрелку
    } else {
      span.textContent = `${item.name} (${item.price})`;

      li.appendChild(span);
      li.style.paddingLeft = nesting * 7 + 24 + 'px';
      parent.appendChild(li);
    }
  }
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
 * @param obj {Object.<string, Array.Object>} Отсортированные списки {'head': [{}]}
 * @param parent {HTMLUListElement} - DOM-элемент ul
 * @param [key='null'] {string} id узлового элемента
 * @param nesting {Number} - вложенность списка
 */
function addEvents(elem, obj, parent, key, nesting) {
  let i = 0; // избежание повторной загрузки внутреннего списка

  elem.addEventListener('click', function() {
    if (!i) {
      getList(obj, parent, key, nesting); // загрузка внутреннего списка
      i++;
    }

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
 * @param url {String} url запроса
 * @returns {Promise<void>}
 */
async function getResponceServer(url) {
  const response = await fetch(url);
  const res = await JSON.parse(response);

  return res;
}
