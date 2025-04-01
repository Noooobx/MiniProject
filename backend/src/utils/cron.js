import cron from 'node-cron';
import Auction from "../models/Auction.js";
import  AuctionOrder  from '../models/AuctionOrder.js';  // Import AuctionOrder model
import { sendNotification } from './notification.js';
import mongoose from 'mongoose';  // Import mongoose to work with models (no need to connect again)

cron.schedule('* * * * *', async () => {
  console.log('Checking for expired auctions...');

  try {
    // Find all auctions that have ended and are active
    const auctionsToEnd = await Auction.find({
      endTime: { $lt: new Date() }, // Auctions whose end time is in the past
      status: 'active',             // Only active auctions
    });

    console.log(auctionsToEnd);

    for (let auction of auctionsToEnd) {
      const highestBid = auction.highestBid || {};
      const winner = highestBid.bidderId;  // The highest bidder (buyer)
      const seller = auction.sellerId;     // The seller who created the auction

      console.log(highestBid,winner,seller);
      // Create an AuctionOrder for the auction winner
      
      const auctionOrder = new AuctionOrder({
        auctionId: auction._id,
        buyerId: winner,
        sellerId: seller,
        amount: auction.highestBid.amount, // The amount is the highest bid
        status: 'pending',                // AuctionOrder status is 'pending' initially
        auctionEndTime: auction.endTime,  // Store the end time of the auction
      });

      // Save the AuctionOrder to the database
      await auctionOrder.save();
      console.log(`Auction order created for auction ${auction.title}`);

      // Update auction status to 'completed'
      auction.status = 'completed';
      await auction.save();
      console.log(`Auction ${auction.title} marked as completed.`);

      // Notify the winner (buyer) about their successful bid
      const user = await mongoose.model('User').findById(winner);
      if (user) {
        await sendNotification(user.email, `Congratulations! You won the auction for ${auction.title}. Please confirm your pickup details.`);
      }

      // Notify the seller about the completed auction
      const sellerUser = await mongoose.model('User').findById(seller);
      if (sellerUser) {
        await sendNotification(sellerUser.email, `Your auction for ${auction.title} has been completed successfully.`);
      }
    }

    console.log('Auction check completed.');
  } catch (err) {
    console.error('Error checking for expired auctions:', err);
  }
});
