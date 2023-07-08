package com.vegarden.backend.controllers;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import com.vegarden.backend.models.Blog;
import com.vegarden.backend.services.BlogService;
import com.vegarden.backend.services.ZenyteService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @Autowired
    private ZenyteService zenyteService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Blog>> getAllBlogs() {
        List<Blog> blogs = blogService.getAllBlogs();
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Blog> getBlogById(@PathVariable String username) {
        Blog blog = blogService.findBlogByOwner(
                zenyteService.findZenyteByUsername(username));
        if (blog != null) {
            return ResponseEntity.ok(blog);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Blog> updateBlog(
            @PathVariable String username, @RequestBody Blog updatedBlog,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Blog blog = blogService.findBlogByOwner(
                zenyteService.findZenyteByUsername(username));
        // Check if the authenticated user has the admin role or if the ID matches the
        // authenticated user
        if (userDetails.getAuthorities().stream().anyMatch(
                role -> role.getAuthority().equals("ROLE_ADMIN")) ||
                userDetails.getUsername().equals(blog.getOwner().getUsername())) {
            Timestamp now = new Timestamp(System.currentTimeMillis());
            // Check if the updatedBlog contains the title field
            if (updatedBlog.getTitle() != null) {
                blog.setTitle(updatedBlog.getTitle());
            }
            // Check if the updatedBlog contains the description field
            if (updatedBlog.getDescription() != null) {
                blog.setDescription(updatedBlog.getDescription());
            }
            blog.setUpdatedAt(now);
            blogService.updateBlog(blog);
            return ResponseEntity.ok(blog);
        }
        // Return an error or unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }

}
