const express = require("express");
const router = express.Router();
const pool = require("../Config/db");

router.get("/api/admin/products", async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT 
        p.id, p.name, p.stock, p.status,
        (SELECT MIN(v.price) FROM product_variants v WHERE v.product_id = p.id) as base_price
      FROM products p
      ORDER BY p.id DESC
    `);
    res.json({ success: true, data: products });
  } catch (err) {
    console.error("Error fetching admin products:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/api/admin/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const [productRows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    if (productRows.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    
    const [variants] = await pool.query("SELECT * FROM product_variants WHERE product_id = ?", [id]);
    
    const productData = {
      ...productRows[0],
      variants: variants
    };
    
    const cleanData = {
      ...productData,
      images: JSON.parse(productData.images || '[]'),
      ingredients: JSON.parse(productData.ingredients || '[]'),
      benefits: JSON.parse(productData.benefits || '[]'),
      nutritionalInfo: JSON.parse(productData.nutritionalInfo || '{}'),
      tags: JSON.parse(productData.tags || '[]')
    };

    res.json({ success: true, data: cleanData });
    
  } catch (err) {
    console.error("Error fetching single admin product:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.post("/api/admin/products", async (req, res) => {
  const { product, variants } = req.body;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const productQuery = `
      INSERT INTO products (name, slug, detailedDescription, category, subcategory, rating, reviews, isNew, isBestSeller, isFeatured, stock, images, ingredients, benefits, nutritionalInfo, shelfLife, storageInstructions, tags, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [productResult] = await connection.query(productQuery, [
      product.name, product.slug, product.detailedDescription, product.category, product.subcategory,
      product.rating || 4.5, product.reviews || 0, product.isNew || 0, product.isBestSeller || 0,
      product.isFeatured || 0, product.stock || 0, JSON.stringify(product.images),
      JSON.stringify(product.ingredients), JSON.stringify(product.benefits),
      JSON.stringify(product.nutritionalInfo), product.shelfLife, product.storageInstructions,
      JSON.stringify(product.tags), product.status || 'active'
    ]);
    
    const newProductId = productResult.insertId;

    for (const variant of variants) {
      const variantQuery = `
        INSERT INTO product_variants (product_id, variant_id_str, name, price, originalPrice, stock, weight)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      await connection.query(variantQuery, [
        newProductId, variant.variant_id_str, variant.name, variant.price,
        variant.originalPrice, variant.stock, variant.weight
      ]);
    }

    await connection.commit();
    res.status(201).json({ success: true, message: "Product created successfully", id: newProductId });

  } catch (err) {
    if (connection) await connection.rollback();
    console.error("Error creating product:", err);
    res.status(500).json({ success: false, message: "Failed to create product", error: err.message });
  } finally {
    if (connection) connection.release();
  }
});

router.put("/api/admin/products/:id", async (req, res) => {
  const { id } = req.params;
  const { product, variants } = req.body;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const productQuery = `
      UPDATE products SET 
      name = ?, slug = ?, detailedDescription = ?, category = ?, subcategory = ?, rating = ?, 
      reviews = ?, isNew = ?, isBestSeller = ?, isFeatured = ?, stock = ?, images = ?, 
      ingredients = ?, benefits = ?, nutritionalInfo = ?, shelfLife = ?, 
      storageInstructions = ?, tags = ?, status = ?
      WHERE id = ?
    `;
    await connection.query(productQuery, [
      product.name, product.slug, product.detailedDescription, product.category, product.subcategory,
      product.rating, product.reviews, product.isNew, product.isBestSeller, product.isFeatured,
      product.stock, JSON.stringify(product.images), JSON.stringify(product.ingredients),
      JSON.stringify(product.benefits), JSON.stringify(product.nutritionalInfo), product.shelfLife,
      product.storageInstructions, JSON.stringify(product.tags), product.status, id
    ]);

    await connection.query("DELETE FROM product_variants WHERE product_id = ?", [id]);

    for (const variant of variants) {
      const variantQuery = `
        INSERT INTO product_variants (product_id, variant_id_str, name, price, originalPrice, stock, weight)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      await connection.query(variantQuery, [
        id, variant.variant_id_str, variant.name, variant.price,
        variant.originalPrice, variant.stock, variant.weight
      ]);
    }

    await connection.commit();
    res.json({ success: true, message: "Product updated successfully" });

  } catch (err) {
    if (connection) await connection.rollback();
    console.error("Error updating product:", err);
    res.status(500).json({ success: false, message: "Failed to update product", error: err.message });
  } finally {
    if (connection) connection.release();
  }
});

router.delete("/api/admin/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id = ?", [id]);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ success: false, message: "Failed to delete product", error: err.message });
  }
});

module.exports = router;