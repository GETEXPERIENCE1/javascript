"use strict";

/**
 * Класс, представляющий книгу.
 */
class Book {
  _pubYear;
  #price;

  /**
   * Создаёт экземпляр книги.
   * @param {string} title - Название книги.
   * @param {number} pubYear - Год издания.
   * @param {number} price - Цена книги.
   */
  constructor(title, pubYear, price) {
    this.title = title;
    this._pubYear = pubYear;
    this.#price = price;
  }

  /** @returns {string} Название книги. */
  get title() {
    return this._title;
  }

  /**
   * Устанавливает название книги.
   * @param {string} value - Название (не пустая строка).
   * @throws {Error} Если значение не строка или пустая строка.
   */
  set title(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error("Название не может быть пустой строкой");
    }
    this._title = value;
  }

  /** @returns {number} Год издания. */
  get pubYear() {
    return this._pubYear;
  }

  /**
   * Устанавливает год издания.
   * @param {number} value - Положительное число.
   * @throws {Error} Если значение не число или <= 0.
   */
  set pubYear(value) {
    if (typeof value !== "number" || value <= 0) {
      throw new Error("Год издания должен быть положительным числом");
    }
    this._pubYear = value;
  }

  /** @returns {number} Цена книги. */
  get price() {
    return this.#price;
  }

  /**
   * Устанавливает цену книги.
   * @param {number} value - Положительное число.
   * @throws {Error} Если значение не число или <= 0.
   */
  set price(value) {
    if (typeof value !== "number" || value <= 0) {
      throw new Error("Цена должна быть положительным числом");
    }
    this.#price = value;
  }

  /**
   * Выводит информацию о книге в консоль.
   */
  show() {
    console.log(`Название: ${this.title}, Цена: ${this.price}`);
  }

  /**
   * Статический метод сравнения книг по году издания.
   * @param {Book} a - Первая книга.
   * @param {Book} b - Вторая книга.
   * @returns {number} Разница годов издания.
   */
  static compare(a, b) {
    return a.pubYear - b.pubYear;
  }
}

// Создание первой книги
const myBook = new Book("Война и мир", 1869, 500);
myBook.show();

// Проверка сеттеров: что будет при вводе некорректных значений
console.log("\n--- Проверка сеттеров (обработка ошибок) ---");
try {
  myBook.title = ""; // пустая строка
} catch (error) {
  console.error("Ошибка при установке названия:", error.message);
}
try {
  myBook.pubYear = -100; // отрицательный год
} catch (error) {
  console.error("Ошибка при установке года:", error.message);
}
try {
  myBook.price = -50; // отрицательная цена
} catch (error) {
  console.error("Ошибка при установке цены:", error.message);
}
try {
  myBook.title = 123; // не строка
} catch (error) {
  console.error("Ошибка при установке названия (число):", error.message);
}
console.log(
  "Корректные значения (год и цена) изменены, название осталось прежним:",
);
myBook.pubYear = 1873;
myBook.price = 550;
myBook.show();

// Массив книг и сортировка
const books = [
  new Book("Евгений Онегин", 1833, 300),
  new Book("Мёртвые души", 1842, 400),
  new Book("Герой нашего времени", 1840, 350),
];
books.sort(Book.compare);
console.log("\nОтсортированные книги по году издания:");
books.forEach((book) => console.log(`${book.title} — ${book.pubYear} год`));

/**
 * Проверяет, пуст ли объект (не имеет собственных свойств).
 * Для примитивов возвращает undefined.
 * @param {*} obj - Проверяемое значение.
 * @returns {boolean|undefined} true – пустой объект, false – есть свойства, undefined – примитив.
 */
function isEmpty(obj) {
  if (obj === null || typeof obj !== "object") return undefined;
  return (
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0
  );
}

console.log("\n--- Проверка isEmpty ---");
console.log(isEmpty({})); // true
console.log(isEmpty({ [Symbol()]: "test" })); // false
console.log(isEmpty(Object.defineProperty({}, "name", { value: "John" }))); // false
console.log(isEmpty(42)); // undefined
console.log(isEmpty("hello")); // undefined

// Объект с методами addClass/removeClass
let obj = {
  className: "open menu",

  /**
   * Добавляет класс, если его ещё нет.
   * @param {string} cls - Имя класса.
   * @returns {object} Сам объект.
   */
  addClass(cls) {
    const classes = this.className ? this.className.split(" ") : [];
    if (!classes.includes(cls)) {
      classes.push(cls);
      this.className = classes.join(" ");
    }
    return this;
  },

  /**
   * Удаляет класс, если он есть.
   * @param {string} cls - Имя класса.
   * @returns {object} Сам объект.
   */
  removeClass(cls) {
    const classes = this.className ? this.className.split(" ") : [];
    const filtered = classes.filter((c) => c !== cls);
    this.className = filtered.join(" ");
    return this;
  },
};

console.log("\n--- Работа с классами ---");
obj.addClass("new").addClass("open");
console.log(obj.className); // "open menu new"
obj.removeClass("menu");
console.log(obj.className); // "open new"

// Преобразование в JSON и обратно
const jsonString = JSON.stringify(obj, null, 2);
console.log("\nJSON строка:\n", jsonString);
const obj2 = JSON.parse(jsonString);
console.log("Декодированный объект:", obj2);
console.log(
  "Равенство объектов (глубокое сравнение через JSON):",
  JSON.stringify(obj) === JSON.stringify(obj2),
);

/**
 * Возвращает количество секунд, прошедших с начала текущего дня.
 * @returns {number}
 */
function getSecondsToday() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((now - startOfDay) / 1000);
}
console.log(`\nСекунд с начала дня: ${getSecondsToday()}`);

/**
 * Форматирует дату в формате "дд.мм.гг".
 * @param {Date} date - Дата для форматирования.
 * @returns {string}
 */
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
}
console.log(formatDate(new Date()));
