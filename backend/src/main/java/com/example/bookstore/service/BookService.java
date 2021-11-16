package com.example.bookstore.service;

import com.example.bookstore.model.Book;
import com.example.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BookService {

	@Autowired
	private BookRepository repository;

	public Page<Book> findBookPageable(String title, Pageable pageable) {
		return repository.findBookPageable(title, pageable);
	}

	public Book saveBook(Book book) {
		return repository.save(book);
	}

}
