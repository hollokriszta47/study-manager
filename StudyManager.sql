CREATE DATABASE StudyManager;
GO

USE StudyManager;
GO

CREATE TABLE teachers (
	id INT IDENTITY PRIMARY KEY,
	username NVARCHAR(50),
	passwordHash NVARCHAR(255)
);

CREATE TABLE students (
	id INT IDENTITY PRIMARY KEY,
	username NVARCHAR(50),
	passwordHash NVARCHAR(255)	
);

CREATE TABLE projects (
	id INT IDENTITY(1,1) PRIMARY KEY,
	code NVARCHAR(50) NOT NULL UNIQUE,
	description NVARCHAR(200) NOT NULL,
	teacherId INT NOT NULL,
	CONSTRAINT FK_projects_users
	FOREIGN KEY (teacherId) REFERENCES teachers(id)
	);

CREATE TABLE tasks(
	id INT IDENTITY(1,1) PRIMARY KEY,
	projectId INT NOT NULL,
	title NVARCHAR(200) NOT NULL,
	dueDate DATE NOT NULL,
	fileName NVARCHAR(200) NOT NULL,	
	CONSTRAINT FK_tasks_projects
	FOREIGN KEY (projectId) REFERENCES projects(id)
	);

CREATE TABLE submissions (
	id INT IDENTITY PRIMARY KEY,
	taskId INT NOT NULL,
	studentId INT NOT NULL,
	fileName NVARCHAR(200) NOT NULL,
	grade INT NOT NULL
	CONSTRAINT FK_sub_task FOREIGN KEY (taskId) REFERENCES tasks(id),
	CONSTRAINT FK_sub_student FOREIGN KEY (studentId) REFERENCES students(id)
	);
INSERT INTO teachers (username, passwordHash) VALUES 
('john smith','$2b$10$6jGHVw5eKiSLmXPe4.IQSeJ4McIbXDd2p6eFq05GtdMlAROc2Ho62'),
('emma johnson', '$2b$10$vL2N4Jod/KdQ7tZ.F.MYquHvNh8VnSNi3eZdLlTDlhFzHBmhtYwna'),
('michael brown', '$2b$10$lsmMMA4U7qzJYvOqpBSqnOL/RPcmbBIkMAk0mG1RWTX7HX6yUJdge'),
('olivia taylor', '$2b$10$cKzrr202j3guGWytmzpESeJmpM68G0n/2VQyfvFG54cenDcZTCFwW'),
('daniel wilson', '$2b$10$p.Eyn.Myx8Uvh1hkngwty.fZmn/dlYGqETZwghClBI6m0p8zNYfue');

INSERT INTO students (username, passwordHash) VALUES 
('oliver harris', '$2b$10$LXWWwFzwYWhY1Jkwbv49kOepAOeHznp0.6Jmor8Q6EWlsbZwAwM5K'),
('elijah martin', '$2b$10$iUYIWiTfsXRDCyvXAj.clebchomvXTMNHhkeYQEE.tEWRzvo.xzku'),
('william clark', '$2b$10$Mb4al6QEac0gokkPPCyHIePsQEb8wqzkyRAvLjKI80F4c2MkAQ.Hm');
