import { Request, Response } from 'express';
import Theme from '../models/Theme';

/**
 * @swagger
 * components:
 *   schemas:
 *     Theme:
 *       type: object
 *       required:
 *         - name
 *         - allowsImages
 *         - allowsVideos
 *         - allowsTexts
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the theme
 *         allowsImages:
 *           type: boolean
 *           description: Indicates if the theme allows images
 *         allowsVideos:
 *           type: boolean
 *           description: Indicates if the theme allows videos
 *         allowsTexts:
 *           type: boolean
 *           description: Indicates if the theme allows texts
 *       example:
 *         name: Test Theme
 *         allowsImages: true
 *         allowsVideos: false
 *         allowsTexts: true
 */
export const createTheme = async (req: Request, res: Response) => {
  const { name, allowsImages, allowsVideos, allowsTexts } = req.body;

  try {
    const existingTheme = await Theme.findOne({ name: { $regex: new RegExp(name, 'i') } });
    if (existingTheme) {
      return res.status(400).json({ message: 'Theme already exists' });
    }

    const newTheme = new Theme({ name, allowsImages, allowsVideos, allowsTexts });
    await newTheme.save();

    res.status(201).json(newTheme);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @swagger
 * /api/themes:
 *   post:
 *     summary: Create a new theme
 *     tags: [Themes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Theme'
 *     responses:
 *       201:
 *         description: Theme created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Theme'
 *       400:
 *         description: Theme already exists
 *       500:
 *         description: Server error
 */
export const getThemes = async (req: Request, res: Response) => {
  try {
    const themes = await Theme.find();
    res.status(200).json(themes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
