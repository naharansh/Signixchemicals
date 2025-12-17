const orders = require('../modules/order.js')
const users=require('../modules/userlogin.js')
exports.Createorders = async (req, res) => {
    try {
        const { lead_id, total_amount, order_number, created_by } = req.body
        if (!lead_id || !total_amount || !order_number || !created_by) {
            return res.status(404).json({ message: "values are required" })
        }

        const result = await orders.findOne({ order_number });
        if (result) {
            res.status(404).json({ message: 'order_number is exist in the database' })
        }
        const byuser=await users.findById(created_by)
        if(!byuser)
        {
            res.status(404).json({ message: 'user does not exist' })
        }
        const create_order = await orders.create({ lead_id, total_amount, order_number, created_by })
        res.status(201).json({
            message: 'order is created',
            create_order
        })

    } catch (error) {
        res.status(500).json({
            message: 'some error is occured',
            err: error.message
        })
    }
}
exports.GetOrders = async (req, res) => {
    try {
        const Allorders = await orders.find().populate('lead_id').populate('created_by')
        if (orders.length === 0) {
            return res.status(404).json({
                message: 'orders are not found'
            })
        }
        res.status(200).json({ message: 'all orders', Allorders })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'some error is occured', err: error.message })
    }

}
exports.GetOrder = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            res.status(404).json({ message: 'id does not exist in the route' })
        }
        const userPermission = await orders.findById(id).populate('lead_id').populate('created_by')
        if (!userPermission) {
            return res.status(404).json({ message: 'order does not found' })
        }
        res.status(200).json({ message: 'order is ', userPermission })
    } catch (error) {
        res.status(500).json({ message: 'order is', err: error.message })
    }
}
exports.UpdateOrders = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            res.status(404).json({ message: 'id does not exist in the route' })
        }
        const data = await orders.findById(id)
        if (!data) {
            return res.status(404).json({ message: 'data does not find' })
        }
        const result = await orders.findByIdAndUpdate(id,req.body, {
            new: true,
            runValidators: true,
            context: "query"

        })
        if (!result) {
            return res.status(404).json({ message: 'order cannot be updated' })
        }
        res.status(200).json({ message: 'updated order', result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}
exports.DeleteOrders = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            res.status(404).json({ message: 'id does not exist in the route' })
        }
        const data = await orders.findById(id) 
        if (!data) {
            return res.status(404).json({ message: 'data does not find' })
        }
        const result = await orders.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({ message: 'order cannot be deleted' })
        }
        res.status(200).json({ message: 'order is deleted'})
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}