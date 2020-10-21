package com.example.demo.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="User")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)	
	@Column(name="id")
	private int id;

	@Column(name="username")
	private String username;
	
	@Column(name="mail")
	private String mail;

	@Column(name="birth_date")
	//@CreationTimestamp
	private Date birth_date;
	
	@Column(name="career")
	private String career;
	
	@Column(name="role")
	private String role;

	@Column(name="name")
	private String name;

	@Column(name="password")
	private String password;	

	@Column(name="entry_time")
	@UpdateTimestamp
	private Date entry_time;

	public User() {}
	
	public User( int id,
	String username, String mail,
	Date birth_date, String career, String role,
	String name, String password, Date entry_time) {
		this.id = id;
		this.username = username;
		this.mail = mail;
		this.birth_date = birth_date;		
		this.career = career;
		this.role = role;
		this.name = name;
		this.password = password; 
		this.entry_time = entry_time;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}	

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public void setMail(String mail) {
		this.mail = mail;
	} 

	public String getMail() {
		return mail;
	}


	public Date getBirth_date() {
		return birth_date;
	}

	public void setBirth_date(Date birth_date) {
		this.birth_date = birth_date;
	}

	public String getCareer() {
		return career;
	}

	public void setCareer(String career) {
		this.career = career;
	}
	
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getEntry_time() {
		return entry_time;
	}

	public void setEntry_time(Date entry_time) {
		this.entry_time = entry_time;
	}

	@Override
	public String toString() {
		return "User"+
		"[id=" + id + 
		", mail=" + mail + 
		", username=" + username + 
		", mail=" + mail + 
		", birth_date=" + birth_date + 
		", career=" + career + 
		", role=" + role + 
		", name=" + name + 
		", password=" + password + 
		", entry_time=" + entry_time + 
		"]";
	}
	
	
}
