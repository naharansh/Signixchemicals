const modules = require('../modules/categories.js')
exports.CreateCategories = async (req, res) => {
    try {
        const { category_name, description } = req.body
        if (!category_name) {
            return res.status(404).json({ message: 'category_name is undefined' })
        }
        const finddata = await modules.findOne({ category_name })
        if (finddata) {
            return res.status(404).json({ message: 'category exist' })
        }
        const result = await modules.create({ category_name, description })
        res.status(201).json({ message: 'category is created', result })
    } catch (error) {
        res.staus(500).json({ message: 'some error is occured', err: error.message })
    }
}
exports.GetCategories = async (req, res) => {
    try {
        const categories = await modules.find()
        if (categories.length === 0) {
            res.status(404).json({ message: 'categories are not exist' })
        }
        res.status(200).json({ message: 'categories are', categories })
    } catch (error) {
        res.status(500).json({ message: 'some error occures', err: error.message })
    }
}
exports.GetCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({ message: 'id does not exist in the route' })
        }
        const result = await modules.findById(id)
        if (!result) {
            return res.status(404).json({ message: 'category not found' })
        }
        res.status(200).json({
            message: 'category is',
            result
        })
    } catch (error) {
        return res.status(404).json({ message: 'some error is occured', err: error.message })
    }
}
exports.UpdateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({ message: 'id does not exist in the route' })
        }
        const data = await modules.findById(id)
        if (!data) {
            res.json({ message: 'category does not found' })
        }
        const result = await modules.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            context: "query"
        })
        if (!result) {
            return res.status(404).json({ message: 'category not updated' })
        }
        res.status(200).json({
            message: 'category is updated',
            result
        })
    } catch (error) {
        return res.status(404).json({ message: 'some error is occured', err: error.message })
    }
}
exports.DeleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({ message: 'id does not exist in the route' })
        }
        const data = await modules.findById(id)
        if (!data) {
            res.json({ message: 'category does not found' })
        }
        const result = await modules.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({ message: 'category not deleted' })
        }
        res.status(200).json({
            message: 'category is deleted',
            
        })
    } catch (error) {
        return res.status(404).json({ message: 'some error is occured', err: error.message })
    }
}
    