import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    stock: '',
    description: '',
    image: null
  });

  //Fetch products from API when the component loads
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")  
      .then(response => {
        console.log("Products fetched:", response.data);
        setProducts(response.data.data);
      })
      .catch(err => console.error("API Error:", err));
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "file" ? files[0] : value  
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.price || !formData.stock || !formData.description) {
      alert("Tous les champs sont obligatoires !");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });


///////////////////////////////
     for (let pair of formDataToSend.entries()) {
       console.log(pair[0], pair[1]);
      }
//////////////////////////
    axios.post("http://localhost:5000/api/products", formDataToSend, {
      ///////////////////////////////////////////////////////
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log("Product added:", response.data);
        
        // ✅ Add the new product instantly to the list
        setProducts(prev => [...prev, response.data.data]);

        // ✅ Reset the form
        setFormData({ title: '', price: '', stock: '', description: '', image: null });
      })
      // .catch(err => console.error("Error adding product:", err));
      .catch(err => console.error("Error adding product:", err.response ? err.response.data : err));
  };











  // handle producte edit 

const handleEditClick = (product) => {
  setEditingProduct(product);
  setFormData({
    title: product.title,
    price: product.price,
    stock: product.stock,
    description: product.description,
    image: product.image || null
  });
};
const handleUpdate = (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();
  Object.keys(formData).forEach(key => {
    formDataToSend.append(key, formData[key]);
  });

  axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, formDataToSend, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    console.log("Product updated:", response.data);
    setProducts(prev => prev.map(p => p._id === editingProduct._id ? response.data.data : p));
    setEditingProduct(null);
    setFormData({title: '', price: '', stock: '', description: '', image: null});
  })
  .catch(err => console.error("Error updating product:", err.response ? err.response.data : err));
};


















  // ✅ Handle product deletion
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setProducts(prev => prev.filter(produit => produit._id !== id));
        console.log("Product deleted successfully");
      })
      // .catch(err => console.error("Delete error:", err));
      .catch(err => console.error("Delete error:", err));

  };

  return (
    <div className="min-h-screen bg-pink-100 p-8">
      
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mt-10">Gestion des Produits</h1>
      </div>

      {/* Add Product Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Ajouter un Produit
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleInputChange} 
            placeholder="Nom du produit" 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleInputChange} 
            placeholder="Prix (€)" 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input 
            type="number" 
            name="stock" 
            value={formData.stock} 
            onChange={handleInputChange} 
            placeholder="Stock" 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <textarea
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            rows="4"
            placeholder="Description du produit" 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input 
            type="file" 
            accept="image/*" 
            name="image" 
            onChange={handleInputChange} 
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500">
              Ajouter le Produit
            </button>
          </div>
        </form>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Liste des Produits</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-medium text-gray-700">Image</th>
                <th className="p-4 text-left font-medium text-gray-700">Titre</th>
                <th className="p-4 text-left font-medium text-gray-700">Prix</th>
                <th className="p-4 text-left font-medium text-gray-700">Stock</th>
                <th className="p-4 text-left font-medium text-gray-700">Modifier</th>
                <th className="p-4 text-left font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-300'>
              {products.length > 0 ? (
                products.map((produit) => (
                  <tr key={produit._id} className='text-black'>
                    <td className="px-6 py-4">
                      {produit.image ? (
                        <img 
                          src={`http://localhost:5000/${produit.image}`} 
                          alt={produit.title} 
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400">Aucune image</span>
                      )}
                    </td>
                    <td className='px-6 py-4'>{produit.title}</td>
                    <td className='px-6 py-4'>{produit.price} €</td>
                    <td className='px-6 py-4'>{produit.stock}</td>
                    <td className='px-6 py-4'> 
                      <button onClick={() => handleEditClick(produit)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
                       Modifier
                       </button>
                    </td>
                    <td className='px-6 py-4'> 
                      <button onClick={() => handleDelete(produit._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : <tr><td colSpan="5" className="text-center py-4">Aucun produit</td></tr>}
            </tbody>
          </table>
        </div>




        {editingProduct && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
      <h2 className="text-xl font-bold mb-4">Modifier le Produit</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleInputChange} 
          placeholder="Nom du produit" 
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input 
          type="number" 
          name="price" 
          value={formData.price} 
          onChange={handleInputChange} 
          placeholder="Prix (€)" 
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input 
          type="number" 
          name="stock" 
          value={formData.stock} 
          onChange={handleInputChange} 
          placeholder="Stock" 
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <textarea
          name="description" 
          value={formData.description} 
          onChange={handleInputChange} 
          rows="4"
          placeholder="Description du produit" 
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <div className="flex justify-between">
          <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
            Annuler
          </button>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500">
            Modifier
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

export default AdminProducts;