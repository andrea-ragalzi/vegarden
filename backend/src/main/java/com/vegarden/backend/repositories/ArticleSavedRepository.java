package com.vegarden.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vegarden.backend.models.ArticleSaved;
import com.vegarden.backend.models.Zenyte;

public interface ArticleSavedRepository extends JpaRepository<ArticleSaved, Long> {

    List<Zenyte> findByAuthor(Zenyte author);
}
