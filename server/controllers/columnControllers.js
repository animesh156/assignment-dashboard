const Column = require("../models/columnModel");

const saveColumns = async (req, res) => {
  try {
    const { columns } = req.body;
    const userId = req.user.id;

    let columnConfig = await Column.findOne({ userId });

    if (columnConfig) {
      columnConfig.columns = columns;
    } else {
      columnConfig = new Column({ userId, columns });
    }

    await columnConfig.save();
    res
      .status(200)
      .json({
        message: "Columns saved successfully",
        columns: columnConfig.columns,
      });
  } catch (error) {
    res.status(500).json({ message: "Failed to save columns" });
  }
};

const getColumns = async (req, res) => {
  try {
    const userId = req.user.id;
    const columnConfig = await Column.findOne({ userId });

    if (!columnConfig) return res.status(200).json({ columns: [] });

    res.status(200).json({ columns: columnConfig.columns });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch columns" });
  }
};


module.exports = {
    getColumns,
    saveColumns
}