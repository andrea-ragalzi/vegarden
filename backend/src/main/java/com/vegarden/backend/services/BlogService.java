package com.vegarden.backend.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vegarden.backend.models.Blog;
import com.vegarden.backend.models.Zenyte;
import com.vegarden.backend.repositories.BlogRepository;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    public Blog findBlogById(Long id) {
        Optional<Blog> blog = blogRepository.findById(id);
        if (blog.isPresent()) {
            return blog.get();
        } else {
            throw new NoSuchElementException(
                    "Blog not found with ID: " + id);
        }
    }

    public void saveBlog(Blog blog) {
        blogRepository.save(blog);
    }

    public void updateBlog(Blog blog) {
        if (blogRepository.existsById(blog.getId())) {
            blogRepository.save(blog);
        } else {
            throw new NoSuchElementException(
                    "Blog not found with ID: " + blog.getId());
        }
    }

    public void deleteBlogById(Long id) {
        if (blogRepository.existsById(id)) {
            blogRepository.deleteById(id);
        } else {
            throw new NoSuchElementException(
                    "Blog not found with ID: " + id);
        }
    }

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public boolean existsById(Long id) {
        return blogRepository.existsById(id);
    }

    public List<Blog> findBlogByTitle(String title) {
        return blogRepository.findByTitle(title);
    }

    public Blog findBlogByOwner(Zenyte owner) {
        return blogRepository.findByOwner(owner).get();
    }

}
