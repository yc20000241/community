package com.example.demo.mapper;

import com.example.demo.model.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.Mapping;

@Mapper
@Component
public interface UserMapper {
    @Insert("insert into user (name,token,account_id,gmt_create,gmt_modified) values (#{name},#{token},#{accountId},#{gmtCreate},#{gmtModified})")
    public void insert(User user);
}
