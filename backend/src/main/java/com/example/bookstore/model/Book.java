package com.example.bookstore.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "UUID")
	private UUID id;

	@Column
	@NotEmpty(message = "Cannot be null")
	private String title;

	@Column(length = 200)
	@Lob
	@NotEmpty(message = "Cannot be null")
	private String description;

	@Column
	@Min(value = 1000, message = "Min value: 1000")
	private int releaseYear;

	@Column
	private String author;

	@Column
	@Min(value = 1)
	private double price;

}
