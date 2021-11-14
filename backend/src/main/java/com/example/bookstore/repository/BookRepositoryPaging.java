package com.example.bookstore.repository;

import com.example.bookstore.model.Book;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.UUID;

public interface BookRepositoryPaging extends PagingAndSortingRepository<Book, UUID> {

}
