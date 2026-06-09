"use strict";

/**
 * Класс, представляющий книгу с базовыми свойствами.
 */
class book {
  constructor(title, pubYear, price) {
    this.title = title;
    this.pubYear = pubYear;
    this.price = price;
  }
  show() {
    console.log(`Название: ${this.title}, Цена: ${this.price}`);
  }
}

const myBook = new book("Война и мир", 1869, 500);
myBook.show();

/**
 * Класс книги с валидацией через геттеры/сеттеры и приватным полем #price.
 */
class bookWithGetters {
  #price;
  constructor(title, pubYear, price) {
    this.title = title;
    this.pubYear = pubYear;
    this.#price = price;
  }
  get title() {
    return this._title;
  }
  set title(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error("Название не может быть пустой строкой");
    }
    this._title = value;
  }
  get pubYear() {
    return this._pubYear;
  }
  set pubYear(value) {
    if (typeof value !== "number" || value <= 0) {
      throw new Error("Год издания должен быть положительным числом");
    }
    this._pubYear = value;
  }
  get price() {
    return this.#price;
  }
  set price(value) {
    if (typeof value !== "number" || value <= 0) {
      throw new Error("Цена должна быть положительным числом");
    }
    this.#price = value;
  }
  show() {
    console.log(`Название: ${this.title}, Цена: ${this.price}`);
  }
}

const myBook2 = new bookWithGetters("Преступление и наказание", 1866, 450);
myBook2.show();
myBook2.title = "Идиот";
console.log(myBook2.title);

class bookWithCompare extends bookWithGetters {
  static compare(bookA, bookB) {
    return bookA.pubYear - bookB.pubYear;
  }
}

const books = [
  new bookWithCompare("Евгений Онегин", 1833, 300),
  new bookWithCompare("Мёртвые души", 1842, 400),
  new bookWithCompare("Герой нашего времени", 1840, 350),
];
books.sort(bookWithCompare.compare);
console.log("Отсортированные книги по году издания:");
books.forEach((book) => console.log(`${book.title} — ${book.pubYear} год`));

/**
 * Проверяет, является ли объект пустым.
 * ВОЗВРАЩАЕТ: undefined если объект пуст, false если не пуст.
 * @param {object} obj - Проверяемый объект (не null, не примитив).
 * @returns {undefined|false}
 * @throws {TypeError} Если аргумент не объект или null.
 */
function isEmpty(obj) {
  if (obj === null || typeof obj !== "object") {
    throw new TypeError("Аргумент должен быть объектом (не null, не примитив)");
  }
  const empty =
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0;
  return empty ? undefined : false;
}

console.log(isEmpty({})); // undefined
console.log(isEmpty({ [Symbol()]: "test" })); // false (есть символ)
const objWithProp = Object.defineProperty({}, "name", { value: "John" });
console.log(isEmpty(objWithProp)); // false (есть свойство "name")

// console.log(isEmpty(true)); // ошибка, как и требовалось

let obj = { className: "open menu" };

function addClass(obj, cls) {
  let classes = obj.className ? obj.className.split(" ") : [];
  if (!classes.includes(cls)) {
    classes.push(cls);
  }
  obj.className = classes.join(" ").trim();
  return obj;
}

function removeClass(obj, cls) {
  let classes = obj.className ? obj.className.split(" ") : [];
  classes = classes.filter((c) => c !== cls);
  obj.className = classes.join(" ").trim();
  return obj;
}

obj = { className: "open menu" };
addClass(obj, "new");
console.log(obj.className);
addClass(obj, "open");
console.log(obj.className);
removeClass(obj, "menu");
console.log(obj.className);

const testObj = {
  name: "John",
  age: 30,
  address: {
    city: "Moscow",
    zip: 101000,
  },
};
const jsonString = JSON.stringify(testObj, null, 2);
console.log("JSON строкa:\n", jsonString);
const obj2 = JSON.parse(jsonString);
console.log("Декодированный объект:", obj2);
console.log(JSON.stringify(testObj) === JSON.stringify(obj2));

function getSecondsToday() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((now - startOfDay) / 1000);
}
console.log(`Секунд с начала дня: ${getSecondsToday()}`);

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
}
console.log(formatDate(new Date()));
