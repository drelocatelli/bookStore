package com.example.bookstore.repository;

import com.example.bookstore.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {

	@Query("SELECT b FROM Book b WHERE b.title LIKE %:title% ORDER BY b.title DESC")
	List<Book> findAllByTitle(@Param("title") String title);
}
