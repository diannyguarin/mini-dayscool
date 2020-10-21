package com.example.demo.dao;

import java.util.List;

import com.example.demo.entity.User;


public interface UserDAO {  
	
	public List<User> findAll();
	
	public User findById(int id);

	//public User find(String usernameMail, String password);

	public User findByUsernameOrMailAndPassword(String usernameMail, String password);
	
	public void save(User user);

	public void updateEntry_time(User user);
	
	public void deleteById(int id);
}