import type { Response } from "express";
import { Order } from "../models/order.model.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req: any, res: Response) => {
  try {
    const { orderItems, shippingAddress, totalAmount } = req.body;

    // Assuming auth middleware sets req.user
    const userId = req.user?.id || req.body.userId;

    if (!orderItems || orderItems.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No order items" });
    }

    const order = new Order({
      userId,
      items: orderItems,
      shippingAddress,
      total: totalAmount,
      status: "placed",
    });

    const createdOrder = await order.save();

    res.status(201).json({
      success: true,
      data: createdOrder,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getUserOrders = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id || req.query.userId;
    const orders = await Order.find({ userId }).populate("items.product");

    res.json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req: any, res: Response) => {
  try {
    const orders = await Order.find({})
      .populate("items.product")
      .sort("-createdAt");

    res.json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req: any, res: Response) => {
  try {
    const { status, trackingId } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = status || order.status;
      if (trackingId) order.trackingId = trackingId;

      const updatedOrder = await order.save();
      res.json({
        success: true,
        data: updatedOrder,
      });
    } else {
      res.status(404).json({ success: false, message: "Order not found" });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
