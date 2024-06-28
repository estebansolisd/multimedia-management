import { Request, Response } from "express";
import Content from "../models/Content";

export const createContent = async (req: Request, res: Response) => {
  const { title, description, category, url, theme, createdBy, content } = req.body;

  try {
    const newContent = new Content({
      title,
      description,
      category,
      url,
      theme,
      content,
      createdBy,
    });
    await newContent.save();

    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getContents = async (req: Request, res: Response) => {
  try {
    const contents = await Content.find()
      .populate("theme")
      .populate("category")
      .populate("createdBy");
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
