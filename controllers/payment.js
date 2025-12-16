const Payment = require('../modules/payments.js')
const Order=require('../modules/order.js')
exports.CreatePayment = async (req, res) => {
    try {
        const { amount, payment_mode, status, order_id } = req.body
        if (!amount || !payment_mode || !status || !order_id) {
            return res.status(404).json({ message: 'fields are required' })
        }
        const order = await Order.findById(order_id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        const payment = await Payment.create({

            amount,
            payment_mode,
            status,order_id

        });
        res.status(200).json({ message: 'Payment is created', payment })

    } catch (error) {
        res.status(404).json({ message: 'some error is occured', err: error.message })
    }
}
exports.UpdatePayment = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({ message: 'id does not exist in the route' })
        }
        const result = await Payment.findById(id)
        if (!result) {
            return res.status(404).json({ message: 'paymentdetails are not found' })
        }
        const paymentdetails = await Payment.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            extend: 'query'
        })
        if (!paymentdetails) {
            return res.status(404).json({ message: 'paymentdetails are not updated' })
        }
        res.status(200).json({ message: 'paymentdetails are updated', paymentdetails })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}
exports.GetPayments = async (req, res) => {
    try {
        const result = await Payment.find()
        if (result.length === 0) {
            return res.status(404).json({ message: 'payment details are not found' })
        }
        res.status(200).json({ message: 'payments detials', result })
    } catch (error) {
        res.status(404).json({ message: 'some error is occur', err: error.message })
    }
}
exports.GetPayment = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({ message: 'id are not found in the routes' })
        }
        const result = await Payment.findById(id)
        if (!result) {
            return res.status(404).json({ message: 'payment detail are not found' })
        }
        res.status(200).json({ message: 'payment are not found', result })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}
exports.DeletePayment = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({ message: 'id does exist in the routes' })
        }
        const result = await Payment.findById(id)
        if (!result) {
            return res.status(404).json({ message: 'paymentdetails does not found' })
        }
        const data = await Payment.findByIdAndDelete(id)
        if (!data) {
            return res.status(404).json({ message: 'payment does not found' })
        }
        res.status(200).json({ message: 'paymentdetails are not found' })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}