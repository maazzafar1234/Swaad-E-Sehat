const express = require("express");
const router = express.Router();
const pool = require("../Config/db");

const parseProduct = (product) => {
  try {
    return {
      ...product,
      images: JSON.parse(product.images || '[]'),
      ingredients: JSON.parse(product.ingredients || '[]'),
      benefits: JSON.parse(product.benefits || '[]'),
      nutritionalInfo: JSON.parse(product.nutritionalInfo || '{}'),
      tags: JSON.parse(product.tags || '[]')
    };
  } catch (e) {
    console.error('Failed to parse JSON for product:', e);
    return product;
  }
};


router.get("/api/products", async (req, res) => {
  try {
    const { search, category, sort, featured } = req.query;
    
    let sql = `
      SELECT 
        p.*, 
        v.price as base_price,
        v.originalPrice as base_original_price,
        v.variant_id_str as default_variant_id,   -- e.g. "500g"
        v.name as default_variant_name            -- e.g. "500g Pack"
      FROM products p
      LEFT JOIN product_variants v ON v.id = (
          SELECT id FROM product_variants 
          WHERE product_id = p.id 
          ORDER BY price ASC, id ASC 
          LIMIT 1
      )
    `;

    let params = [];
    let whereClauses = [];

    if (featured) {
      whereClauses.push("p.isFeatured = 1");
    }
    if (category) {
      whereClauses.push("p.category = ?");
      params.push(category);
    }
    if (search) {
      const sanitizedSearch = search.replace(/[%_]/g, '\\$&');
      if (sanitizedSearch.length > 100) {
        return res.status(400).json({ success: false, message: "Search term too long" });
      }
      const searchTerm = `%${sanitizedSearch}%`;
      whereClauses.push(
        `(p.name LIKE ? ESCAPE '\\' OR p.detailedDescription LIKE ? ESCAPE '\\' OR p.tags LIKE ? ESCAPE '\\')`
      );
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (whereClauses.length > 0) {
      sql += ` WHERE ` + whereClauses.join(" AND ");
    }

    let orderBy = "ORDER BY p.name ASC";
    switch (sort) {
      case 'price-low':
        orderBy = `ORDER BY base_price ASC`;
        break;
      case 'price-high':
        orderBy = `ORDER BY base_price DESC`;
        break;
      case 'name-asc':
        orderBy = `ORDER BY p.name ASC`;
        break;
      case 'name-desc':
        orderBy = `ORDER BY p.name DESC`;
        break;
      case 'rating':
        orderBy = `ORDER BY p.rating DESC`;
        break;
      case 'newest':
        orderBy = `ORDER BY p.created_at DESC`;
        break;
    }
    sql += ` ${orderBy}`;

    const [products] = await pool.query(sql, params);
    const cleanProducts = products.map(parseProduct);
    
    res.json({ success: true, data: cleanProducts });

  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/api/products/slug/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return res.status(400).json({ success: false, message: "Invalid product slug" });
    }

    const [productRows] = await pool.query(
      "SELECT * FROM products WHERE slug = ?", [slug]
    );

    if (productRows.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    
    const product = parseProduct(productRows[0]);

    const [variants] = await pool.query(
      "SELECT * FROM product_variants WHERE product_id = ?", [product.id]
    );

    const productData = {
      ...product,
      variants: variants
    };
    
    res.json({ success: true, data: productData });

  } catch (err) {
    console.error(`Error fetching product ${req.params.slug}:`, err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;