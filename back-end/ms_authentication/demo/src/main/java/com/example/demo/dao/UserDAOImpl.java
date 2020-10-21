package com.example.demo.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.User;

@Repository
public class UserDAOImpl implements UserDAO{

	@Autowired
	private EntityManager entityManager;
	
	@Override
	public List<User> findAll() {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<User> theQuery = currentSession.createQuery("from User", User.class);
		
		List<User> users = theQuery.getResultList();
		
		return users;

	}

	@Override
	public User findById(int id) {
		
		Session currentSession = entityManager.unwrap(Session.class);

		User user = currentSession.get(User.class, id);
		
		return user;
		
	}

	@Override
	public User findByUsernameOrMailAndPassword(String usernameMail, String password) {	
			
		Session currentSession = entityManager.unwrap(Session.class);		
		String w="SELECT * FROM User where (username='"+usernameMail+"' or username='"+usernameMail+"') and password='"+password+"'";
		Query<User>  theQuery = currentSession.createSQLQuery(w).addEntity(User.class); 
		List<User> users = theQuery.getResultList();	
		
		if ( !users.isEmpty()){
			return users.get(0);
		}
		return new User();
	}

	@Override
	public void save(User user) { 
		Session currentSession = entityManager.unwrap(Session.class);
		
		currentSession.save(user);
	}

	@Override
	public void updateEntry_time(User user) { 
		Session currentSession = entityManager.unwrap(Session.class);	
		user.setEntry_time(null);
		currentSession.update(user);
	}

	@Override
	public void deleteById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<User> theQuery = currentSession.createQuery("delete from User where id=:idUser");
		
		theQuery.setParameter("idUser", id);
		theQuery.executeUpdate();		
	}
	
}