import express from "express";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

const chatRouter = express.Router();

// Start or get a conversation between two users
chatRouter.post("/conversation", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const conversation = await Conversation.findOneAndUpdate(
      { members: { $all: [senderId, receiverId] } },
      { $setOnInsert: { members: [senderId, receiverId] } },
      { upsert: true, new: true }
    );
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Could not start conversation" });
  }
});

// Get all conversations for a user
chatRouter.get("/conversations/:userId", async (req, res) => {
  try {
    const conversations = await Conversation.find({ members: req.params.userId });
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch conversations" });
  }
});

// Send a message
chatRouter.post("/message", async (req, res) => {
  try {
    const message = await new Message(req.body).save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: "Could not send message" });
  }
});

// Get all messages in a conversation
chatRouter.get("/messages/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch messages" });
  }
});

export default chatRouter;
