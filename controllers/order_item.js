const modules = require('../modules/order_items')
const product = require('../modules/product')
const orders = require('../modules/order')

exports.CreatePermission = async (req, res) => {
    try {
    //    console.log(product_id.)
        const { price, quantity, gst, order_id, product_id } = req.body
        if (!price || !quantity || !gst || !order_id || !product_id) {
            return res.status(404).json({ message: 'fields is required' })
        }
        const orderss = await orders.findById(order_id)
        const products = await product.findById(product_id)
        if (!orderss) {
            return res.status(404).json({ message: 'orders does not exist' })
        }
        if (!products) {
            return res.status(404).json({ message: 'products does not exist' })
        }
        const result = await modules.create({ price, quantity, gst, order_id,product_id })
        res.status(200).json({
            message: 'data is inserted',
            result
        })
    } catch (error) {
        res.status(500).json({
            message: 'some error is occured',
            err: error.message
        })
    }
}
exports.GetAllPermission = async (req, res) => {
    try {
        const result = await modules.find()
        if (result.length === 0) {
            return res.status(404).json({ message: 'order_items does not exist in the database' })
        }
        res.status(200).json({ message: 'All order_items', result })
    }
    catch (error) {

        res.status(500).json({
            message: 'some error is occured',
            err: error.message
        })
    }
}
exports.GetPermission = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                message: 'id does not send'
            })
        }
        const order_item = await modules.findById(id)
        if (!order_item) {
            return res.status(404).json({
                message: 'order_item is not found'
            })
        }
        res.status(200).json({
            message: 'your order_item is found',
            order_item
        })
    } catch (error) {
        return res.status(500).json({
            message: 'some error is occured',
            err: error.message
        })
    }
}
exports.DeletePermission = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({ message: 'id does not exists' })
        }
        const result = await modules.findById(id)
        if (!result) {
            return res.status(404).json({ message: 'order_item does not exist' })
        }
        const deletePermission = await modules.findByIdAndDelete(id)
        if (!deletePermission) {
            return res.status(404).json({ message: 'order_item does not found' })
        }
        res.status(200).json({
            message: 'order_item is deleted'
        })

    } catch (error) {
        res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}
exports.UpdatePermission = async (req, res) => {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(404).json({ message: 'id does not exist ' })
        }
        const result = await modules.findById(id)
        if (!result) {
            return res.status(404).json({ message: 'order_item does not exist' })
        }
        const updateorder_item = await modules.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            context: "query"
        }
        )

        return res.status(200).json({ message: 'order_item is updated', updateorder_item })
    } catch (error) {
        return res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}