'use strict';

function printResource(book) {
  let message = `${book.bookID}: ${book.name}, Author ${book.author}, type: ${book.type}  publishing year: ${book.year}`;
  
  console.log(message);
}

async function readData(){
  // same names here as are the fields
  const bookID = await prompt('Input bookId: ');
  const name = await prompt('Input name: ');
  const author = await prompt('Input author: ');
  const type = await prompt('Input type: ');
  const year = await prompt('Input year: ');

  return {
    bookID,
    name, 
    author, 
    type, 
    year
  }
}

function prompt(promptText) {
  process.stdout.write(promptText);
  return new Promise(resolve => {
    const input = process.stdin; // stdin = input from keyboard
    input.resume();
    input.once('data', data => {
      input.pause();
      resolve(data.toString().trim()); // additional whitespaces trimmed out
    })
  })
}

module.exports = {printResource, readData, prompt}