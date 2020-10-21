package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.User;

public interface UserService {
	
	public List<User> findAll();
	
	public User findById(int id);

	public User findByUsernameOrMailAndPassword(String UserNameMail, String password);
	
	public void save(User user);

	public void updateEntry_time(User user);
	
	public void deleteById(int id);
}
