import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const DebugProducts = () => {
  const [debugInfo, setDebugInfo] = useState({
    products: null,
    apiResponse: null,
    imageTests: [],
    errors: []
  });

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    const errors = [];
    let products = null;
    let apiResponse = null;

    // Test 1: Check API connection
    try {
      console.log('🔍 Testing API connection...');
      const response = await api.getProducts();
      apiResponse = response;
      products = response.data?.products || [];
      console.log('✅ API Response:', response);
      console.log('✅ Products found:', products.length);
    } catch (error) {
      errors.push(`API Error: ${error.message}`);
      console.error('❌ API Error:', error);
    }

    // Test 2: Check product structure
    if (products && products.length > 0) {
      console.log('🔍 Checking first product structure...');
      const firstProduct = products[0];
      console.log('First product:', firstProduct);
      console.log('Product image field:', firstProduct.image);
      console.log('Product images array:', firstProduct.images);

      // Test 3: Test image URLs
      const imageTests = [];
      const testImages = [
        firstProduct.image,
        ...(firstProduct.images || []).slice(0, 2)
      ].filter(Boolean);

      for (const imgUrl of testImages) {
        try {
          const testResult = await testImageUrl(imgUrl);
          imageTests.push({
            url: imgUrl,
            ...testResult
          });
        } catch (error) {
          imageTests.push({
            url: imgUrl,
            accessible: false,
            error: error.message
          });
        }
      }

      setDebugInfo({
        products,
        apiResponse,
        imageTests,
        errors
      });
    } else {
      setDebugInfo({
        products: [],
        apiResponse,
        imageTests: [],
        errors: [...errors, 'No products found in database. Run seed script!']
      });
    }
  };

  const testImageUrl = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const timeout = setTimeout(() => {
        reject(new Error('Image load timeout (10s)'));
      }, 10000);

      img.onload = () => {
        clearTimeout(timeout);
        resolve({
          accessible: true,
          width: img.width,
          height: img.height
        });
      };

      img.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('Image failed to load'));
      };

      img.src = url;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🔍 Product Images Debug Tool</h1>

        {/* API Response */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">1. API Response</h2>
          {debugInfo.apiResponse ? (
            <div>
              <p className="text-green-600 mb-2">✅ API Connection: Success</p>
              <p className="mb-2">Products found: <strong>{debugInfo.products?.length || 0}</strong></p>
              <details className="mt-4">
                <summary className="cursor-pointer text-blue-600">View Full API Response</summary>
                <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto text-xs">
                  {JSON.stringify(debugInfo.apiResponse, null, 2)}
                </pre>
              </details>
            </div>
          ) : (
            <p className="text-red-600">❌ API Connection: Failed</p>
          )}
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">2. Products in Database</h2>
          {debugInfo.products && debugInfo.products.length > 0 ? (
            <div>
              <p className="text-green-600 mb-4">✅ Found {debugInfo.products.length} products</p>
              <div className="space-y-4">
                {debugInfo.products.slice(0, 5).map((product, index) => (
                  <div key={product._id || index} className="border p-4 rounded">
                    <p><strong>Name:</strong> {product.name}</p>
                    <p><strong>Main Image:</strong> {product.image || '❌ Missing'}</p>
                    <p><strong>Images Array:</strong> {product.images?.length || 0} images</p>
                    {product.image && (
                      <div className="mt-2">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="max-w-xs border rounded"
                          onError={(e) => {
                            e.target.style.border = '3px solid red';
                            e.target.alt = '❌ Image failed to load';
                          }}
                          onLoad={(e) => {
                            e.target.style.border = '3px solid green';
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="text-yellow-800 font-semibold">⚠️ No products found!</p>
              <p className="text-yellow-700 mt-2">To fix this, run the seed script:</p>
              <code className="block mt-2 p-2 bg-yellow-100 rounded">
                cd backend && npm run seed
              </code>
            </div>
          )}
        </div>

        {/* Image URL Tests */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">3. Image URL Accessibility Tests</h2>
          {debugInfo.imageTests.length > 0 ? (
            <div className="space-y-4">
              {debugInfo.imageTests.map((test, index) => (
                <div key={index} className={`border p-4 rounded ${test.accessible ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p><strong>URL:</strong> <code className="text-xs">{test.url}</code></p>
                  {test.accessible ? (
                    <div>
                      <p className="text-green-600">✅ Image is accessible</p>
                      <p>Dimensions: {test.width} x {test.height}px</p>
                      <img src={test.url} alt="Test" className="mt-2 max-w-xs border rounded" />
                    </div>
                  ) : (
                    <div>
                      <p className="text-red-600">❌ Image failed to load</p>
                      <p className="text-red-500">Error: {test.error}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No images to test</p>
          )}
        </div>

        {/* Errors */}
        {debugInfo.errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-800">❌ Errors Found</h2>
            <ul className="list-disc list-inside space-y-2">
              {debugInfo.errors.map((error, index) => (
                <li key={index} className="text-red-700">{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">🔧 Quick Fixes</h2>
          <div className="space-y-2">
            <p><strong>1. If no products found:</strong></p>
            <code className="block p-2 bg-white rounded">cd backend && npm run seed</code>
            
            <p className="mt-4"><strong>2. If images don't load:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Check browser console for CORS errors</li>
              <li>Verify image URLs are direct links (https://i.ibb.co/...)</li>
              <li>Test image URLs directly in browser</li>
            </ul>

            <p className="mt-4"><strong>3. Check browser console:</strong></p>
            <p className="text-sm">Press F12 → Console tab → Look for image loading errors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugProducts;

