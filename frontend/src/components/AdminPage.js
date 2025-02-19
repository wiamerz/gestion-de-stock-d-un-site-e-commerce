import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const AdminProducts = () => {
  return (
    <div className="min-h-screen bg-pink-100 p-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="flex items-start justify-center text-3xl font-bold text-gray-900">Gestion des Produits</h1>
      </div>

      {/* Add Product Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Ajouter un Produit
          </h2>
        </div>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Image Upload */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image du Produit
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  id="image-upload"
                />
                <label 
                  htmlFor="image-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-500"
                >
                  Cliquez pour upload une image
                </label>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nom du produit"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix (€)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock
              </label>
              <input
                type="number"
                min="0"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Quantité disponible"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Description du produit"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
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
                <th className="p-4 text-left font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Product Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                </td>
                <td className="p-4">Exemple de Produit</td>
                <td className="p-4">99.99 €</td>
                <td className="p-4">42</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;




























// import React from 'react'

// const AdminPage = () => {
//   return (
//     <div className="flex items-start justify-center min-h-screen text-4xl font-bold mt-10">
//     Gestion de Produit
//         </div>

//   )
// }

// export default AdminPage