const {getSheetData} = require('../config/googleSheets')

const SheetData = async(req,res) => {
    try {

        const data = await getSheetData("Sheet1")
        res.json({data})
        
    } catch (error) {
        res.status(500).json({message: "Failed to fetch data"})
    }
}


module.exports = {
    SheetData
}