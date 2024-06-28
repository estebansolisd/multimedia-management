// __tests__/categoryController.test.ts
import { Request, Response } from 'express';
import { createCategory, getCategories } from '../../controllers/categoryController';
import Category from '../../models/Category';

jest.mock('../../models/Category');

describe('categoryController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        name: 'Test Category',
        type: 'Test Type',
        thumbnail: 'http://testthumbnail.com',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      (Category.findOne as jest.Mock).mockResolvedValue(null);
      (Category as any).mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(req.body),
      }));

      await createCategory(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });

    it('should return 400 if category already exists', async () => {
      (Category.findOne as jest.Mock).mockResolvedValue(req.body);

      await createCategory(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category already exists' });
    });

    it('should return a 500 error if there is a server error', async () => {
      (Category.findOne as jest.Mock).mockRejectedValue(new Error('Server error'));

      await createCategory(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Server error',
        error: new Error('Server error'),
      });
    });
  });

  describe('getCategories', () => {
    it('should return all categories', async () => {
      const categories = [req.body];
      (Category.find as jest.Mock).mockResolvedValue(categories);

      await getCategories(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(categories);
    });

    it('should return a 500 error if there is a server error', async () => {
      (Category.find as jest.Mock).mockRejectedValue(new Error('Server error'));

      await getCategories(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Server error',
        error: new Error('Server error'),
      });
    });
  });
});
