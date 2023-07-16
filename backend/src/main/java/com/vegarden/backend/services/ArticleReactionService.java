package com.vegarden.backend.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vegarden.backend.models.Article;
import com.vegarden.backend.models.ArticleReaction;
import com.vegarden.backend.models.Zenyte;
import com.vegarden.backend.repositories.ArticleReactionRepository;

@Service
public class ArticleReactionService {

    @Autowired
    private ArticleReactionRepository articleReactionRepository;

    public ArticleReaction findArticleReactionById(Long id) {
        Optional<ArticleReaction> reaction = articleReactionRepository.findById(id);
        if (reaction.isPresent()) {
            return reaction.get();
        } else {
            throw new NoSuchElementException(
                    "Article reaction not found with ID: " + id);
        }
    }

    public void saveArticleReaction(ArticleReaction articleReaction) {
        if (!articleReactionRepository.existsByArticleAndAuthor(
                articleReaction.getArticle(), articleReaction.getAuthor())) {
            articleReactionRepository.save(articleReaction);
        }
    }

    public void updateArticleReaction(ArticleReaction articleReaction) {
        if (articleReactionRepository.existsById(articleReaction.getId())) {
            articleReactionRepository.save(articleReaction);
        } else {
            throw new NoSuchElementException(
                    "Article reaction not found with ID: " + articleReaction.getId());
        }
    }

    public void deleteArticleReactionById(Long id) {
        if (articleReactionRepository.existsById(id)) {
            articleReactionRepository.deleteById(id);
        } else {
            throw new NoSuchElementException(
                    "Article reaction not found with ID: " + id);
        }
    }

    public void deleteByArticleAndAuthor(Article article, Zenyte author) {
        if (articleReactionRepository.existsByArticleAndAuthor(article, author)) {
            articleReactionRepository.deleteByArticleAndAuthor(article, author);
        }
    }

    public List<ArticleReaction> getAllArticleReactions() {
        return articleReactionRepository.findAll();
    }

    public boolean existsById(Long id) {
        return articleReactionRepository.existsById(id);
    }

    public boolean existsByArticleAndAuthor(Article article, Zenyte author) {
        return articleReactionRepository.existsByArticleAndAuthor(article, author);
    }

}
