package com.example.bookstore.service;

import com.example.bookstore.model.Book;
import com.example.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

	@Autowired
	private BookRepository repository;

	public List<Book> findAll() {
		return repository.findAll();
	}

	public List<Book> findAllByTitle(String title) {
		return repository.findAllByTitle(title);
	}

	public Book saveBook(Book book) {
		return repository.save(book);
	}

}
