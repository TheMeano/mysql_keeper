import {db} from "../db.js";
import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv"



export const getPosts = (req, res) => {
    const cookieHeader = req.headers.cookie;
  
    if (!cookieHeader || !cookieHeader.includes("access_token")) {
      return res.status(401).json("Not authenticated!");
    }
  
    const token = cookieHeader
      .split(";")
      .find((cookie) => cookie.trim().startsWith("access_token="))
      .split("=")[1];
  
    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "SELECT * FROM posts WHERE uid = ?";
  
      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
  
        return res.status(200).json(data);
      });
    });
  };

  export const addPost = (req, res) => {
    const cookieHeader = req.headers.cookie;
  
    if (!cookieHeader || !cookieHeader.includes("access_token")) {
      return res.status(401).json("Not authenticated!");
    }
  
    const token = cookieHeader
      .split(";")
      .find((cookie) => cookie.trim().startsWith("access_token="))
      .split("=")[1];
  
    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const { title, content } = req.body;
  
      const q = "INSERT INTO posts (title, content, uid) VALUES (?, ?, ?)";
      const values = [title, content, userInfo.id];
  
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
  
        return res.status(201).json("Post has been created");
      });
    });
  };

  
  export const deletePost = (req, res) => {
    const cookieHeader = req.headers.cookie;
  
    if (!cookieHeader || !cookieHeader.includes("access_token")) {
      return res.status(401).json("Not authenticated!");
    }
  
    const token = cookieHeader
      .split(";")
      .find((cookie) => cookie.trim().startsWith("access_token="))
      .split("=")[1];
  
    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const postId = req.params.id;
      const userId = userInfo.id;
  
      const q = "DELETE FROM posts WHERE id = ? AND uid = ?";
  
      db.query(q, [postId, userId], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json("Internal Server Error");
        }
  
        if (data.affectedRows === 0) {
          return res.status(403).json("You can only delete your posts!");
        }
  
        return res.json("Post has been deleted.");
      });
    });
  };


  export const updatePost = (req, res) => {
    console.log('Update request received');
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader || !cookieHeader.includes('access_token')) {
      return res.status(401).json("Not authenticated!");
    }
  
    const token = cookieHeader.split(';').find(cookie => cookie.trim().startsWith('access_token=')).split('=')[1];
  
    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
      if (err) {
        console.log('Token verification error:', err);
        return res.status(403).json("Token is not valid!");
      }
  
      const postId = req.params.id;
      const q = "UPDATE posts SET `title`=?, `content`=? WHERE `id` = ? AND `uid` = ?";
  
      const values = [
        req.body.title,
        req.body.content
      ];
  
      db.query(q, [...values, postId, userInfo.id], (err, data) => {
        if (err) {
          console.log('Database error:', err);
          return res.status(500).json(err);
        }
        console.log('Post has been updated');
        return res.json("Post has been updated");
      });
    });
  };

  
  export const deleteAll = (req, res)=>{
    const cookieHeader = req.headers.cookie;

    if(!cookieHeader || !cookieHeader.includes("access_token")){
      return res.status(401).json("Not authenticated!");
    }

    const token = cookieHeader
      .split(";")
      .find((cookie) => cookie.trim().startsWith("access_token="))
      .split("=")[1];

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo)=>{
      if(err) return res.status(403).json("Token is not valid!");

      

      const q = "DELETE * FROM posts WHERE uid = ?"

      db.query(q, [userInfo.id], (err, data)=>{
         
        if(err){
          console.log(err)
          return res.status(500).json("Internal Server Error");
        }

        if(data.affectedRows === 0) {
          return res.status(403).json("You can only delete your posts")
        }
 
        return res.json("All posts have been deleted!")
      })
    })
  }
