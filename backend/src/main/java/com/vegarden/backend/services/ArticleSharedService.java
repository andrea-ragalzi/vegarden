package com.vegarden.backend.services;

import com.vegarden.backend.models.ArticleShared;
import com.vegarden.backend.repositories.ArticleSharedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ArticleSharedService {

    @Autowired
    private ArticleSharedRepository articleSharedRepository;

    public ArticleShared findArticleSharedById(Long id) {
        Optional<ArticleShared> shared = articleSharedRepository.findById(id);
        if (shared.isPresent()) {
            return shared.get();
        } else {
            throw new NoSuchElementException("Shared article not found with ID: " + id);
        }
    }

    public void saveArticleShared(ArticleShared articleShared) {
        articleSharedRepository.save(articleShared);
    }

    public void updateArticleShared(ArticleShared articleShared) {
        if (articleSharedRepository.existsById(articleShared.getId())) {
            articleSharedRepository.save(articleShared);
        } else {
            throw new NoSuchElementException("Shared article not found with ID: " + articleShared.getId());
        }
    }

    public void deleteArticleSharedById(Long id) {
        if (articleSharedRepository.existsById(id)) {
            articleSharedRepository.deleteById(id);
        } else {
            throw new NoSuchElementException("Shared article not found with ID: " + id);
        }
    }

    public List<ArticleShared> getAllArticleShared() {
        return articleSharedRepository.findAll();
    }

    public boolean existsById(Long id) {
        return articleSharedRepository.existsById(id);
    }
}