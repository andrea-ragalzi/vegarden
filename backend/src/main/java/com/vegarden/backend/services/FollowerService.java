package com.vegarden.backend.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vegarden.backend.models.Follower;
import com.vegarden.backend.models.Zenyte;
import com.vegarden.backend.repositories.FollowerRepository;

@Service
public class FollowerService {

    @Autowired
    private FollowerRepository followerRepository;

    public Follower findFollowerById(Long id) {
        Optional<Follower> follower = followerRepository.findById(id);
        if (follower.isPresent()) {
            return follower.get();
        } else {
            throw new NoSuchElementException(
                    "Follower not found with ID: " + id);
        }
    }

    public void saveFollower(Follower follower) {
        followerRepository.save(follower);
    }

    public void updateFollower(Follower follower) {
        if (followerRepository.existsById(follower.getId())) {
            followerRepository.save(follower);
        } else {
            throw new NoSuchElementException(
                    "Follower not found with ID: " + follower.getId());
        }
    }

    public void deleteFollowerById(Long id) {
        if (followerRepository.existsById(id)) {
            followerRepository.deleteById(id);
        } else {
            throw new NoSuchElementException(
                    "Follower not found with ID: " + id);
        }
    }

    public List<Follower> getAllFollowers() {
        return followerRepository.findAll();
    }

    public boolean existsById(Long id) {
        return followerRepository.existsById(id);
    }

    public List<Zenyte> findFollowersByFollower(Zenyte follower) {
        return followerRepository.findByFollower(follower);
    }

    public List<Zenyte> findFollowersByFollowed(Zenyte followed) {
        return followerRepository.findByFollowed(followed);
    }

    public boolean existsByFollowerAndFollowed(Zenyte follower, Zenyte followed) {
        return followerRepository.existsByFollowerAndFollowed(follower, followed);
    }

    public void deleteByFollowerAndFollowed(Zenyte follower, Zenyte followed) {
        followerRepository.deleteByFollowerAndFollowed(follower, followed);
    }

    public long countByFollower(Zenyte follower) {
        return followerRepository.countByFollower(follower);
    }

    public long countByFollowed(Zenyte followed) {
        return followerRepository.countByFollowed(followed);
    }
}
