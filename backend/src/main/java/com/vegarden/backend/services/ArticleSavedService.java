package com.vegarden.backend.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vegarden.backend.models.Article;
import com.vegarden.backend.models.ArticleSaved;
import com.vegarden.backend.models.Zenyte;
import com.vegarden.backend.repositories.ArticleSavedRepository;

@Service
public class ArticleSavedService {

    @Autowired
    private ArticleSavedRepository articleSavedRepository;

    public ArticleSaved findArticleSavedById(Long id) {
        Optional<ArticleSaved> saved = articleSavedRepository.findById(id);
        if (saved.isPresent()) {
            return saved.get();
        } else {
            throw new NoSuchElementException(
                    "Saved article not found with ID: " + id);
        }
    }

    public void saveArticleSaved(ArticleSaved articleSaved) {
        articleSavedRepository.save(articleSaved);
    }

    public void updateArticleSaved(ArticleSaved articleSaved) {
        if (articleSavedRepository.existsById(articleSaved.getId())) {
            articleSavedRepository.save(articleSaved);
        } else {
            throw new NoSuchElementException(
                    "Saved article not found with ID: " + articleSaved.getId());
        }
    }

    public void deleteArticleSavedById(Long id) {
        if (articleSavedRepository.existsById(id)) {
            articleSavedRepository.deleteById(id);
        } else {
            throw new NoSuchElementException(
                    "Saved article not found with ID: " + id);
        }
    }

    public List<ArticleSaved> getAllArticleSaved() {
        return articleSavedRepository.findAll();
    }

    public boolean existsById(Long id) {
        return articleSavedRepository.existsById(id);
    }

    public boolean existsByArticleAndAuthor(Article article, Zenyte author) {
        return articleSavedRepository.existsByArticleAndAuthor(article, author);
    }

    public void deleteByArticleAndAuthor(Article article, Zenyte author) {
        articleSavedRepository.deleteByArticleAndAuthor(article, author);
    }

    public List<Article> findSavedArticlesByAuthorOrderByCreatedAtDesc(Zenyte author) {
        return articleSavedRepository.findSavedArticlesByAuthorOrderByCreatedAtDesc(author);
    }

    public void deleteByArticleId(Long articleId) {
        articleSavedRepository.deleteByArticleId(articleId);
    }

}
