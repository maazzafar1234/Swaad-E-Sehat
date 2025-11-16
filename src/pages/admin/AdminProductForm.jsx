import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiLoader, FiPlus, FiTrash2, FiX, FiUpload } from 'react-icons/fi';
import ClientApiInstance from '../../api/axiosIntercepter';
import { toast } from 'react-toastify';

const FormGroup = ({ children }) => <div className="w-full">{children}</div>;

const FormInput = ({ label, name, value, onChange, ...props }) => (
  <FormGroup>
    <label htmlFor={name} className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
    <input
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
      {...props}
    />
  </FormGroup>
);

const FormTextArea = ({ label, name, value, onChange, ...props }) => (
  <FormGroup>
    <label htmlFor={name} className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
      {...props}
    ></textarea>
  </FormGroup>
);

const Checkbox = ({ name, label, checked, onChange }) => (
  <label htmlFor={name} className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      name={name}
      id={name}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-amber-600 rounded focus:ring-amber-500"
    />
    <span className="text-sm font-medium text-slate-700">{label}</span>
  </label>
);

const StringListEditor = ({ label, items, setItems }) => {
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const handleRemoveItem = (indexToRemove) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-5 border-2 border-amber-200 rounded-lg space-y-3 bg-amber-50">
      <label className="block text-sm font-semibold text-amber-900">{label}</label>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index] = e.target.value;
                setItems(newItems);
              }}
              className="flex-1 px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 pt-2 border-t border-amber-200">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Type and click Add..."
          className="flex-1 px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={handleAddItem}
          className="px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition flex items-center gap-1"
        >
          <FiPlus size={18} />
        </button>
      </div>
    </div>
  );
};

const VariantEditor = ({ variants, setVariants }) => {
  const handleAddVariant = () => {
    setVariants([
      ...variants,
      { variant_id_str: '', name: '', price: 0, originalPrice: 0, stock: 0, weight: '' }
    ]);
  };

  const handleRemoveVariant = (indexToRemove) => {
    setVariants(variants.filter((_, index) => index !== indexToRemove));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newVariants = [...variants];
    newVariants[index][name] = value;
    setVariants(newVariants);
  };

  return (
    <div className="p-6 border-2 border-amber-200 rounded-lg space-y-4 bg-amber-50">
      <h3 className="text-lg font-bold text-amber-900 border-b-2 border-amber-200 pb-3">📦 Product Variants</h3>
      {variants.map((variant, index) => (
        <div key={index} className="p-4 border-2 border-amber-300 rounded-lg space-y-4 relative bg-white">
          <button
            type="button"
            onClick={() => handleRemoveVariant(index)}
            className="absolute top-2 right-2 p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
          >
            <FiX size={18} />
          </button>
          <h4 className="font-bold text-amber-900">Variant {index + 1}</h4>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Name (e.g., 500g Pack)" name="name" value={variant.name} onChange={(e) => handleChange(e, index)} />
            <FormInput label="Variant ID (e.g., 500g)" name="variant_id_str" value={variant.variant_id_str} onChange={(e) => handleChange(e, index)} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormInput label="Price (Sale)" name="price" type="number" value={variant.price} onChange={(e) => handleChange(e, index)} />
            <FormInput label="Original Price" name="originalPrice" type="number" value={variant.originalPrice} onChange={(e) => handleChange(e, index)} />
            <FormInput label="Stock" name="stock" type="number" value={variant.stock} onChange={(e) => handleChange(e, index)} />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddVariant}
        className="w-full py-3 border-2 border-dashed border-amber-300 rounded-lg text-amber-700 hover:border-amber-500 hover:bg-amber-100 transition font-semibold flex items-center justify-center gap-2"
      >
        <FiPlus /> Add Variant
      </button>
    </div>
  );
};

const ImageEditor = ({ images, setImages }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await ClientApiInstance.post('/api/admin/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        const newImageUrl = response.data.filePath;
        setImages([...images, newImageUrl]);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(response.data.message || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-5 border-2 border-amber-200 rounded-lg space-y-3 bg-amber-50">
      <label className="block text-sm font-semibold text-amber-900">🖼️ Product Images</label>
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative group aspect-square">
              <img src={img} alt="Product" className="w-full h-full object-cover rounded-lg border-2 border-amber-200" />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="pt-2">
        <label
          htmlFor="image-upload"
          className={`w-full py-3 border-2 border-dashed border-amber-300 rounded-lg text-amber-700 hover:border-amber-500 hover:bg-amber-100 transition flex items-center justify-center gap-2 font-semibold ${isUploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        >
          {isUploading ? <FiLoader className="animate-spin" size={18} /> : <FiUpload size={18} />}
          {isUploading ? 'Uploading...' : 'Upload an Image'}
        </label>
        <input
          type="file"
          id="image-upload"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleImageUpload}
          disabled={isUploading}
        />
      </div>
    </div>
  );
};

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [product, setProduct] = useState({
    name: '', slug: '', detailedDescription: '', category: 'sweets', subcategory: '',
    rating: 4.5, reviews: 0, isNew: 0, isBestSeller: 0, isFeatured: 0,
    stock: 0, images: [], ingredients: [], benefits: [],
    nutritionalInfo: { calories: '', protein: '', fat: '', carbs: '', fiber: '' },
    shelfLife: '6 months', storageInstructions: 'Store in a cool, dry place.',
    tags: [], status: 'active'
  });
  const [variants, setVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        setIsFetching(true);
        try {
          const response = await ClientApiInstance.get(`/api/admin/products/${id}`);
          if (response.data.success) {
            const fullProduct = response.data.data;
            setProduct(fullProduct);
            setVariants(fullProduct.variants || []);
          }
        } catch (err) {
          toast.error("Could not fetch product details.");
        } finally {
          setIsFetching(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEditing]);

  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? (checked ? 1 : 0) : value;
    setProduct(prev => ({ ...prev, [name]: val }));
  };

  const handleNutriChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      nutritionalInfo: { ...prev.nutritionalInfo, [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const payload = {
      product: product,
      variants: variants
    };

    try {
      if (isEditing) {
        await ClientApiInstance.put(`/api/admin/products/${id}`, payload);
        toast.success("Product updated successfully!");
      } else {
        await ClientApiInstance.post("/api/admin/products", payload);
        toast.success("Product created successfully!");
      }
      navigate("/admin/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isFetching && isEditing) {
    return (
      <div className="flex justify-center items-center h-96">
        <FiLoader className="w-12 h-12 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b-2 border-amber-200 sticky top-0 z-10 bg-gradient-to-r from-amber-50 to-orange-50">
        <div>
          <h2 className="text-3xl font-bold text-amber-900">
            {isEditing ? "✏️ Edit Product" : "➕ Add New Product"}
          </h2>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 sm:mt-0 flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg shadow-md hover:shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50"
        >
          {isLoading ? <FiLoader className="animate-spin" size={20} /> : <FiSave size={20} />}
          <span>{isLoading ? "Saving..." : "Save Product"}</span>
        </button>
      </div>

      <div className="p-6 space-y-8">
        <div className="p-6 border-2 border-amber-200 rounded-lg space-y-6 bg-amber-50">
          <h3 className="text-lg font-bold text-amber-900">📝 Basic Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Product Name" name="name" value={product.name} onChange={handleProductChange} required />
            <FormInput label="Slug (URL)" name="slug" value={product.slug} onChange={handleProductChange} required />
          </div>
          <FormTextArea label="Description" name="detailedDescription" value={product.detailedDescription} onChange={handleProductChange} rows="5" />
        </div>

        <div className="p-6 border-2 border-amber-200 rounded-lg space-y-6 bg-amber-50">
          <h3 className="text-lg font-bold text-amber-900">🏷️ Organization</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput label="Category" name="category" value={product.category} onChange={handleProductChange} />
            <FormInput label="Subcategory" name="subcategory" value={product.subcategory} onChange={handleProductChange} />
            <FormGroup>
              <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
              <select name="status" id="status" value={product.status} onChange={handleProductChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white">
                <option value="active">Active (Published)</option>
                <option value="inactive">Inactive (Draft)</option>
              </select>
            </FormGroup>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput label="Base Stock (Total)" name="stock" type="number" value={product.stock} onChange={handleProductChange} />
            <FormInput label="Rating (e.g., 4.5)" name="rating" type="number" step="0.1" value={product.rating} onChange={handleProductChange} />
            <FormInput label="Reviews (Count)" name="reviews" type="number" value={product.reviews} onChange={handleProductChange} />
          </div>
          <div className="flex gap-6">
            <Checkbox name="isNew" label="New Product" checked={product.isNew} onChange={handleProductChange} />
            <Checkbox name="isBestSeller" label="Best Seller" checked={product.isBestSeller} onChange={handleProductChange} />
            <Checkbox name="isFeatured" label="Featured" checked={product.isFeatured} onChange={handleProductChange} />
          </div>
        </div>

        <VariantEditor variants={variants} setVariants={setVariants} />

        <ImageEditor 
          images={product.images} 
          setImages={(newImages) => setProduct(p => ({ ...p, images: newImages }))} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StringListEditor 
            label="🥘 Ingredients" 
            items={product.ingredients} 
            setItems={(newItems) => setProduct(p => ({ ...p, ingredients: newItems }))} 
          />
          <StringListEditor 
            label="⭐ Benefits" 
            items={product.benefits} 
            setItems={(newItems) => setProduct(p => ({ ...p, benefits: newItems }))} 
          />
          <StringListEditor 
            label="🏷️ Tags" 
            items={product.tags} 
            setItems={(newTags) => setProduct(p => ({ ...p, tags: newTags }))} 
          />
        </div>

        <div className="p-6 border-2 border-amber-200 rounded-lg space-y-4 bg-amber-50">
          <h3 className="text-lg font-bold text-amber-900 border-b-2 border-amber-200 pb-3">🥗 Nutritional Info</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormInput label="Calories (per 100g)" name="calories" value={product.nutritionalInfo.calories || ''} onChange={handleNutriChange} />
            <FormInput label="Protein (g)" name="protein" value={product.nutritionalInfo.protein || ''} onChange={handleNutriChange} />
            <FormInput label="Fat (g)" name="fat" value={product.nutritionalInfo.fat || ''} onChange={handleNutriChange} />
            <FormInput label="Carbohydrates (g)" name="carbs" value={product.nutritionalInfo.carbs || ''} onChange={handleNutriChange} />
            <FormInput label="Fiber (g)" name="fiber" value={product.nutritionalInfo.fiber || ''} onChange={handleNutriChange} />
          </div>
        </div>
        
        <div className="p-6 border-2 border-amber-200 rounded-lg space-y-6 bg-amber-50">
          <h3 className="text-lg font-bold text-amber-900">ℹ️ Other Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Shelf Life (e.g., 6 months)" name="shelfLife" value={product.shelfLife} onChange={handleProductChange} />
            <FormInput label="Storage Instructions" name="storageInstructions" value={product.storageInstructions} onChange={handleProductChange} />
          </div>
        </div>

      </div>
    </form>
  );
};

export default AdminProductForm;