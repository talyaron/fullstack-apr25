import { Response } from 'express';
import { Product } from '../models/product';
import { AuthRequest } from '../middleware/auth';

// קבלת כל המוצרים של המשתמש
export const getProducts = async (req: AuthRequest, res: Response) => {
  try {
    const products = await Product.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'שגיאה בקבלת מוצרים',
      error: error.message
    });
  }
};

// קבלת מוצר בודד
export const getProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'מוצר לא נמצא'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'שגיאה בקבלת מוצר',
      error: error.message
    });
  }
};

// יצירת מוצר חדש
export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, price, quantity, category } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      category,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'המוצר נוסף בהצלחה',
      data: product
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'שגיאה ביצירת מוצר',
      error: error.message
    });
  }
};

// עדכון מוצר
export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'מוצר לא נמצא'
      });
    }

    res.status(200).json({
      success: true,
      message: 'המוצר עודכן בהצלחה',
      data: product
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'שגיאה בעדכון מוצר',
      error: error.message
    });
  }
};

// מחיקת מוצר
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'מוצר לא נמצא'
      });
    }

    res.status(200).json({
      success: true,
      message: 'המוצר נמחק בהצלחה',
      data: {}
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'שגיאה במחיקת מוצר',
      error: error.message
    });
  }
};