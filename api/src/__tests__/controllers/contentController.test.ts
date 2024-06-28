// __tests__/contentController.test.ts
import { Request, Response } from 'express';
import { createContent, getContents } from '../../controllers/contentController';
import Content from '../../models/Content';

jest.mock('../../models/Content');

describe('contentController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        title: 'Test Title',
        description: 'Test Description',
        category: 'Test Category',
        url: 'http://testurl.com',
        theme: 'Test Theme',
        createdBy: 'Test User',
        content: 'Test Content',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('createContent', () => {
    it('should create a new content', async () => {
      const savedContent = {
        title: 'Test Title',
        description: 'Test Description',
        category: 'Test Category',
        url: 'http://testurl.com',
        theme: 'Test Theme',
        createdBy: 'Test User',
        content: 'Test Content'
      };

      const mockSave = jest.fn().mockResolvedValue(savedContent);

      (Content as any).mockImplementation(() => ({
        save: mockSave,
      }));

      await createContent(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });

    it('should return a 500 error if there is a server error', async () => {
      (Content as any).mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Server error')),
      }));

      await createContent(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Server error',
        error: new Error('Server error'),
      });
    });
  });

  describe('getContents', () => {
    it('should return all contents', async () => {
      const contents = [req.body];
      (Content.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            populate: jest.fn().mockResolvedValue(contents),
          }),
        }),
      });

      await getContents(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(contents);
    });

    it('should return a 500 error if there is a server error', async () => {
      (Content.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            populate: jest.fn().mockRejectedValue(new Error('Server error')),
          }),
        }),
      });

      await getContents(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Server error',
        error: new Error('Server error'),
      });
    });
  });
});
