"use strict";

class Book {
  _pubYear;
  #price;

  constructor(title, pubYear, price) {
    this.title = title;
    this._pubYear = pubYear;
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

  static compare(a, b) {
    return a.pubYear - b.pubYear;
  }
}

const myBook = new Book("Война и мир", 1869, 500);
myBook.show();

const books = [
  new Book("Евгений Онегин", 1833, 300),
  new Book("Мёртвые души", 1842, 400),
  new Book("Герой нашего времени", 1840, 350),
];
books.sort(Book.compare);
console.log("Отсортированные книги по году издания:");
books.forEach((book) => console.log(`${book.title} — ${book.pubYear} год`));

function isEmpty(obj) {
  if (obj === null || typeof obj !== "object") return undefined;
  return (
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0
  );
}

console.log(isEmpty({}));
console.log(isEmpty({ [Symbol()]: "test" }));
console.log(isEmpty(Object.defineProperty({}, "name", { value: "John" })));
console.log(isEmpty(42));
console.log(isEmpty("hello"));

let obj = {
  className: "open menu",

  addClass(cls) {
    const classes = this.className ? this.className.split(" ") : [];
    if (!classes.includes(cls)) {
      classes.push(cls);
      this.className = classes.join(" ");
    }
    return this;
  },

  removeClass(cls) {
    const classes = this.className ? this.className.split(" ") : [];
    const filtered = classes.filter((c) => c !== cls);
    this.className = filtered.join(" ");
    return this;
  },
};

obj.addClass("new").addClass("open");
console.log(obj.className);
obj.removeClass("menu");
console.log(obj.className);

const jsonString = JSON.stringify(obj, null, 2);
console.log("JSON строка:\n", jsonString);
const obj2 = JSON.parse(jsonString);
console.log("Декодированный объект:", obj2);
console.log(
  "Равенство объектов (глубокое сравнение через JSON):",
  JSON.stringify(obj) === JSON.stringify(obj2),
);

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
