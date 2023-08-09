import { useEffect, useState } from "react";
import BookCard from "./BookCard";

export const BookCardList = () => {
    const [books, setBooks] = useState([]); 
  let i = 1;

  useEffect(() => {
    fetch('./database/books.json')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.log(error));
  }, []);

  return books.map(item => BookCard(item, i++));
}