import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, X } from 'lucide-react';

function AdminProducts() {
  // States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    stock: '',
    description: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data.data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des produits");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === "file") {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      
      // Create preview URL for image
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage(null);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validation
      if (!formData.title || !formData.price || !formData.stock || !formData.description) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'price') {
          formDataToSend.append(key, parseFloat(formData[key]));
        } else if (key === 'stock') {
          formDataToSend.append(key, parseInt(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        "http://localhost:5000/api/products",
        formDataToSend,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      setProducts(prev => [...prev, response.data.data]);
      resetForm();
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);

    } catch (err) {
      setError(err.message || "Erreur lors de l'ajout du produit");
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(prev => prev.filter(product => product._id !== id));
      setError(null);
    } catch (err) {
      setError("Erreur lors de la suppression du produit");
      console.error("Delete error:", err);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      stock: '',
      description: '',
      image: null
    });
    setPreviewImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Gestion des Produits</h1>
        <p className="mt-2 text-gray-600">Gérez votre catalogue de produits</p>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="mb-4 p-4 bg-green-100 border border-green-200 rounded-lg">
          <p className="text-green-800">Produit ajouté avec succès !</p>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Add Product Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
          <Plus className="w-5 h-5" />
          Ajouter un Produit
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du produit *
                </label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="ex: T-shirt blanc"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix (€) *
                </label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleInputChange} 
                  min="0"
                  step="0.01"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="ex: 29.99"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock *
                </label>
                <input 
                  type="number" 
                  name="stock" 
                  value={formData.stock} 
                  onChange={handleInputChange} 
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="ex: 100"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Description détaillée du produit..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  name="image" 
                  onChange={handleInputChange} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {previewImage && (
                  <div className="mt-2 relative inline-block">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                      className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Réinitialiser
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 disabled:bg-blue-300"
            >
              {loading ? 'Ajout en cours...' : 'Ajouter le Produit'}
            </button>
          </div>
        </form>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Liste des Produits</h2>
        
        {loading && <div className="text-center py-4">Chargement...</div>}
        
        {!loading && products.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            Aucun produit disponible
          </div>
        )}
        
        {!loading && products.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left font-medium text-gray-700">Image</th>
                  <th className="p-4 text-left font-medium text-gray-700">Titre</th>
                  <th className="p-4 text-left font-medium text-gray-700">Prix</th>
                  <th className="p-4 text-left font-medium text-gray-700">Stock</th>
                  <th className="p-4 text-left font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {product.image ? (
                        <img 
                          src={`http://localhost:5000/${product.image}`}
                          alt={product.title} 
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No image</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">{product.title}</td>
                    <td className="px-4 py-3">{product.price.toFixed(2)} €</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;