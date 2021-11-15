package com.example.bookstore.service;

import com.example.bookstore.model.Book;
import com.example.bookstore.repository.BookRepository;
import com.example.bookstore.repository.BookRepositoryPaging;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BookService {

	@Autowired
	private BookRepositoryPaging repository;

	@Autowired
	private BookRepository bookRepository;

	public Page<Book> bookSearch(Pageable pageable) {
		return repository.findAll(pageable);
	}

	public Book saveBook(Book book) {
		return bookRepository.save(book);
	}

}
