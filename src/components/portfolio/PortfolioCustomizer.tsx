import React, { useState } from 'react';
import { Briefcase, Plus, Save, Edit, Trash2, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface PortfolioCustomizerProps {
  portfolio: any;
  onSave: (portfolio: any) => void;
}

interface Asset {
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  value: number;
  allocation: number;
  change: number;
  changePercent: number;
}

export const PortfolioCustomizer: React.FC<PortfolioCustomizerProps> = ({ portfolio, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [portfolioName, setPortfolioName] = useState(portfolio.name || 'My Portfolio');
  const [portfolioDescription, setPortfolioDescription] = useState(portfolio.description || '');
  const [assets, setAssets] = useState<Asset[]>(portfolio.assets || []);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({
    symbol: '',
    name: '',
    quantity: 0,
    price: 0
  });

  const calculatePortfolioValue = (assetList: Asset[]) => {
    return assetList.reduce((sum, asset) => sum + asset.value, 0);
  };

  const calculateAssetAllocations = (assetList: Asset[]) => {
    const totalValue = calculatePortfolioValue(assetList);
    return assetList.map(asset => ({
      ...asset,
      allocation: totalValue > 0 ? (asset.value / totalValue) * 100 : 0
    }));
  };

  const addAsset = () => {
    if (!newAsset.symbol || !newAsset.name || !newAsset.quantity || !newAsset.price) {
      toast.error('Please fill in all asset fields');
      return;
    }

    const value = (newAsset.quantity || 0) * (newAsset.price || 0);
    const asset: Asset = {
      symbol: newAsset.symbol || '',
      name: newAsset.name || '',
      quantity: newAsset.quantity || 0,
      price: newAsset.price || 0,
      value,
      allocation: 0, // Will be calculated
      change: 0,
      changePercent: 0
    };

    const updatedAssets = [...assets, asset];
    const assetsWithAllocations = calculateAssetAllocations(updatedAssets);
    
    setAssets(assetsWithAllocations);
    setNewAsset({
      symbol: '',
      name: '',
      quantity: 0,
      price: 0
    });
    
    toast.success('Asset added successfully');
  };

  const updateAsset = (index: number, updates: Partial<Asset>) => {
    const updatedAssets = [...assets];
    
    // If price or quantity changed, recalculate value
    if (updates.price !== undefined || updates.quantity !== undefined) {
      const price = updates.price !== undefined ? updates.price : updatedAssets[index].price;
      const quantity = updates.quantity !== undefined ? updates.quantity : updatedAssets[index].quantity;
      updates.value = price * quantity;
    }
    
    updatedAssets[index] = { ...updatedAssets[index], ...updates };
    
    // Recalculate allocations
    const assetsWithAllocations = calculateAssetAllocations(updatedAssets);
    
    setAssets(assetsWithAllocations);
  };

  const removeAsset = (index: number) => {
    const updatedAssets = assets.filter((_, i) => i !== index);
    const assetsWithAllocations = calculateAssetAllocations(updatedAssets);
    setAssets(assetsWithAllocations);
    toast.success('Asset removed');
  };

  const savePortfolio = () => {
    const totalValue = calculatePortfolioValue(assets);
    const performance = assets.reduce((sum, asset) => sum + asset.changePercent, 0) / assets.length;
    
    const updatedPortfolio = {
      ...portfolio,
      name: portfolioName,
      description: portfolioDescription,
      total_value: totalValue,
      performance: performance || 0,
      risk_score: portfolio.risk_score || 5.0,
      assets
    };
    
    onSave(updatedPortfolio);
    setEditMode(false);
    toast.success('Portfolio customization saved!');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            
            {editMode ? (
              <div>
                <input
                  type="text"
                  value={portfolioName}
                  onChange={(e) => setPortfolioName(e.target.value)}
                  className="block w-full text-xl font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  placeholder="Portfolio Name"
                />
                <input
                  type="text"
                  value={portfolioDescription}
                  onChange={(e) => setPortfolioDescription(e.target.value)}
                  className="block w-full text-sm text-gray-600 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none mt-1"
                  placeholder="Portfolio Description"
                />
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-gray-900">{portfolioName}</h3>
                <p className="text-sm text-gray-600">{portfolioDescription || 'Custom portfolio based on your data'}</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {editMode ? (
              <>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={savePortfolio}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Edit className="w-4 h-4" />
                <span>Customize Portfolio</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Portfolio Editor */}
      {editMode && (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Asset</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
              <input
                type="text"
                value={newAsset.symbol}
                onChange={(e) => setNewAsset({ ...newAsset, symbol: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="AAPL"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={newAsset.name}
                onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Apple Inc."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                value={newAsset.quantity || ''}
                onChange={(e) => setNewAsset({ ...newAsset, quantity: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="100"
                min="0"
                step="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                value={newAsset.price || ''}
                onChange={(e) => setNewAsset({ ...newAsset, price: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="150.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="flex justify-end mb-6">
            <button
              onClick={addAsset}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Asset</span>
            </button>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Assets</h3>
          
          {assets.length === 0 ? (
            <div className="text-center py-8 bg-gray-100 rounded-lg">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No assets in portfolio yet</p>
              <p className="text-sm text-gray-500">Add assets using the form above</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price ($)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value ($)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocation</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {assets.map((asset, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{asset.symbol}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{asset.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        <input
                          type="number"
                          value={asset.quantity}
                          onChange={(e) => updateAsset(index, { quantity: parseFloat(e.target.value) || 0 })}
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          min="0"
                          step="1"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        <input
                          type="number"
                          value={asset.price}
                          onChange={(e) => updateAsset(index, { price: parseFloat(e.target.value) || 0 })}
                          className="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">${asset.value.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{asset.allocation.toFixed(1)}%</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        <button
                          onClick={() => removeAsset(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={4} className="px-4 py-3 text-sm font-medium text-gray-900">Total</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">${calculatePortfolioValue(assets).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">100%</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Portfolio Summary */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-xl font-bold text-gray-900">
                  ${calculatePortfolioValue(assets).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Assets</p>
                <p className="text-xl font-bold text-gray-900">
                  {assets.length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                portfolio.performance >= 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {portfolio.performance >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Performance</p>
                <p className={`text-xl font-bold ${
                  portfolio.performance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {portfolio.performance >= 0 ? '+' : ''}{portfolio.performance.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Asset Allocation */}
        <h4 className="font-medium text-gray-900 mb-3">Asset Allocation</h4>
        <div className="space-y-3 mb-6">
          {assets.map((asset, index) => (
            <div key={index} className="flex items-center">
              <div className="w-32 text-sm text-gray-700 mr-3">{asset.symbol}</div>
              <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500"
                  style={{ width: `${asset.allocation}%` }}
                ></div>
              </div>
              <div className="w-16 text-right text-sm text-gray-700 ml-3">{asset.allocation.toFixed(1)}%</div>
            </div>
          ))}
          
          {assets.length === 0 && (
            <div className="text-center py-4 bg-gray-100 rounded-lg">
              <p className="text-gray-600">No assets to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};