package com.vegarden.backend.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vegarden.backend.models.ArticleComment;
import com.vegarden.backend.repositories.ArticleCommentRepository;

@Service
public class ArticleCommentService {

    @Autowired
    private ArticleCommentRepository articleCommentRepository;

    public ArticleComment findArticleCommentById(Long id) {
        Optional<ArticleComment> comment = articleCommentRepository.findById(id);
        if (comment.isPresent()) {
            return comment.get();
        } else {
            throw new NoSuchElementException("Comment not found with ID: " + id);
        }
    }

    public void saveArticleComment(ArticleComment articleComment) {
        articleCommentRepository.save(articleComment);
    }

    public void updateArticleComment(ArticleComment articleComment) {
        if (articleCommentRepository.existsById(articleComment.getId())) {
            articleCommentRepository.save(articleComment);
        } else {
            throw new NoSuchElementException("Comment not found with ID: " + articleComment.getId());
        }
    }

    public void deleteArticleCommentById(Long id) {
        if (articleCommentRepository.existsById(id)) {
            articleCommentRepository.deleteById(id);
        } else {
            throw new NoSuchElementException("Comment not found with ID: " + id);
        }
    }

    public List<ArticleComment> getAllArticleComments() {
        return articleCommentRepository.findAll();
    }

    public boolean existsById(Long id) {
        return articleCommentRepository.existsById(id);
    }
}
