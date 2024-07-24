import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { FedaPay, Transaction } from "fedapay";

/// placing user order for frontend

const fedapay = FedaPay.setApiKey(process.env.FEDAPAY_SECRET_KEY);


const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173"
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "XOF",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 * 80,
            },
            quantity: item.quantity,
        }))

        line_items.push({
            price_data: {
                currency: "XOF",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2*100*80,
            },
            quantity: 1,
        })


        const session = await Transaction.create({
            transaction_type: "sale",
            payment_method_types: ["payment"],
            line_items: line_items,
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url })
    } catch(error) {

    }
}


export {
    placeOrder
}