const {items} = require('../database/sequelize/index');

module.exports = {
    getAllitem: async (req, res) => {
      try {
        const item = await items.findAll(); // Fetch all items using Sequelize
        res.json(item);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching items");
      }
    },
  
    additem: async (req, res) => {
      const newItem = req.body;
      
      try {
        const item = await items.create(newItem); // Create a new item using Sequelize
        res.status(201).send({
          message: "Item created successfully",
          itemId: item.id,
          item: item,  // Include the created item in the response
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("Error adding item");
      }
    },
  
    getOneitem: async (req, res) => {
      const itemId = req.params.id;
      try {
        const item = await items.findByPk(itemId); // Find item by ID using Sequelize
        if (!item) {
          return res.status(404).send("Item not found");
        }
        res.json(item);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching item");
      }
    },
  
    deleteitem: async (req, res) => {
      const itemId = req.params.id;
      try {
        const deletedCount = await items.destroy({
          where: {
            id: itemId, // Use 'id' instead of 'ref' unless 'ref' is explicitly defined in your model
          },
        });
  
        if (deletedCount === 0) {
          return res.status(404).send("Item not found");
        }
  
        res.json({ message: "Item deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting item");
      }
    },
  
    // Update an existing item
    updateitem: async (req, res) => {
      const itemId = req.params.id;
      const updates = req.body;  // The fields to update
      
      // You can perform validation here to make sure the fields to be updated are valid
  
      try {
        const [updatedCount] = await items.update(updates, {
          where: { id: itemId }  // Find the item by 'id' and apply updates
        });
  
        if (updatedCount === 0) {
          return res.status(404).send("Item not found");
        }
  
        // Fetch the updated item to return in the response
        const updatedItem = await items.findByPk(itemId);
        res.json({
          message: "Item updated successfully",
          item: updatedItem,  // Return the updated item
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("Error updating item");
      }
    },
  };
  