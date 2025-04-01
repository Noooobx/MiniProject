import express from 'express';
import AuctionOrder from '../models/AuctionOrder.js';  

const auctionOrderRouter = express.Router();

// Fetch auction orders with buyer and seller details
auctionOrderRouter.get('/auction-orders', async (req, res) => {
  try {
    // Fetch auction orders and populate buyer, seller, and auction details
    const auctionOrders = await AuctionOrder.find()
      .populate('auctionId', 'title description startTime endTime')  // Populate auction details
      .populate('buyerId', 'name email')  // Populate buyer details
      .populate('sellerId', 'name email')  // Populate seller details
      .exec();

    // If no orders found, return an empty array
    if (auctionOrders.length === 0) {
      return res.status(404).json({ message: 'No auction orders found.' });
    }

    // Send back the populated auction orders
    res.json({ auctionOrders });
  } catch (error) {
    console.error('Error fetching auction orders:', error);
    res.status(500).json({ message: 'Error fetching auction orders', error });
  }
});

auctionOrderRouter.put('/auction-orders/:id', async (req, res) => {
    try {
      const { pickupLocation, contactInfo } = req.body;
      const { id } = req.params;
      console.log(id)
  
      const updatedOrder = await AuctionOrder.findOneAndUpdate(
        { auctionId: id },
        { pickupLocation, contactInfo },
        { new: true }
    );
    
      console.log(updatedOrder)
  
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Auction order not found.' });
      }
  
      res.json({ message: 'Auction order updated successfully', updatedOrder });
    } catch (error) {
      console.error('Error updating auction order:', error);
      res.status(500).json({ message: 'Error updating auction order', error });
    }
  });

export default auctionOrderRouter;
