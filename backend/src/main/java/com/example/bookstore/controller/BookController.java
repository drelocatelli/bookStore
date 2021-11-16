package com.example.bookstore.controller;

import com.example.bookstore.model.Book;
import com.example.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.bookstore.dto.BookDTO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
public class BookController {

	@Autowired
	private BookService service;

	@GetMapping(value = "/search")
	public ResponseEntity<?> findBook(@RequestParam("title") String title, Pageable pageable) {

		Page<Book> books = service.findBookPageable(title, pageable);

		return ResponseEntity.ok(books);
	}

	@PostMapping("/new")
	public ResponseEntity<?> newBook(@RequestBody BookDTO dto) {

		if(
				dto.getTitle().isEmpty() ||
				dto.getDescription().isEmpty() ||
				dto.getPrice() == null ||
				dto.getReleaseYear() == null
		) {
			return new ResponseEntity("Please send valid values", HttpStatus.UNPROCESSABLE_ENTITY);
		}

		Book book = Book.builder()
				.title(dto.getTitle())
				.description(dto.getDescription())
				.releaseYear(dto.getReleaseYear())
				.author(dto.getAuthor())
				.price(dto.getPrice())
				.build();

		try {
			Book books = service.saveBook(book);
			return new ResponseEntity(books, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}

}
