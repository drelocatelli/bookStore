package com.example.bookstore.controller;

import com.example.bookstore.model.Book;
import com.example.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.bookstore.dto.BookDTO;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/books")
public class BookController {

	@Autowired
	private BookService service;

	@GetMapping
	public ResponseEntity<?> getAllBooks() {
		return ResponseEntity.ok(service.findAll());
	}

	@GetMapping(value = "/search")
	public ResponseEntity<?> findAllByTitle(@RequestParam("title") String title) {
		return ResponseEntity.ok(service.findByTitleIgnoreCaseContaining(title));
	}

	@PostMapping("/new")
	public ResponseEntity<?> newBook(@Valid  @RequestBody BookDTO dto, BindingResult bindingResult) {

		try {

			Book book = Book.builder()
					.title(dto.getTitle())
					.description(dto.getDescription())
					.releaseYear(dto.getReleaseYear())
					.price(dto.getPrice())
					.build();

			Book books = service.saveBook(book);

			return ResponseEntity.ok(books);
		} catch (Exception e) {
			return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}

}
