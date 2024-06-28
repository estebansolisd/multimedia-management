import { Request, Response } from "express";
import Content from "../models/Content";
/**
 * @swagger
 * components:
 *   schemas:
 *     Content:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - category
 *         - url
 *         - theme
 *         - createdBy
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the content
 *         description:
 *           type: string
 *           description: The description of the content
 *         category:
 *           type: string
 *           description: The category of the content
 *         url:
 *           type: string
 *           description: The URL of the content
 *         theme:
 *           type: string
 *           description: The theme of the content
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the content
 *         content:
 *           type: string
 *           description: The content
 *       example:
 *         title: Test Title
 *         description: Test Description
 *         category: Test Category
 *         url: http://testurl.com
 *         theme: Test Theme
 *         createdBy: Test User
 *         content: Test Content
 */

/**
 * @swagger
 * /api/contents:
 *   post:
 *     summary: Create a new content
 *     tags: [Contents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     responses:
 *       201:
 *         description: The content was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       500:
 *         description: Some server error
 */
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

/**
 * @swagger
 * /api/contents:
 *   get:
 *     summary: Returns the list of all the contents
 *     tags: [Contents]
 *     responses:
 *       200:
 *         description: The list of the contents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 *       500:
 *         description: Some server error
 */

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
