let book = {
  title: "Война и мир",
  author: "Лев Толстой",
  pages: 1274,
  isFinished: true
}
document.writeln("На полке стоит ", book.title)

let pagesPerDay = book['pages'] / 365
document.writeln("Чтобы прочитать её за год, читайте ", pagesPerDay.toFixed(1), " страницы в день")

book.readers = [1, 2, 3]
console.log(book.readers)

delete book.readers[2]
console.log(book.readers)

book.pages = undefined
console.log(book.pages)

console.log('title' in book)
console.log('year' in book)
console.log(book.hasOwnProperty('author'))
console.log(book.hasOwnProperty('soauthor'))

for (var prop in book) {
    console.log(prop + ': ' + book[prop]);
}