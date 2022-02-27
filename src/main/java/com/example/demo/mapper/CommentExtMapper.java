package com.example.demo.mapper;

import com.example.demo.model.Comment;
import org.springframework.stereotype.Component;

@Component
public interface CommentExtMapper {

    int incCommentCount(Comment comment);
}