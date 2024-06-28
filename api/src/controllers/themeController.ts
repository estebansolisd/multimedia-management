import { Request, Response } from 'express';
import Theme from '../models/Theme';

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

export const getThemes = async (req: Request, res: Response) => {
  try {
    const themes = await Theme.find();
    res.status(200).json(themes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
