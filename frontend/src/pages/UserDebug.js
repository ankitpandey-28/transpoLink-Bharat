import React from 'react';
import { useUser } from '../context/UserContext';
import { CheckCircle, XCircle, AlertTriangle, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const UserDebug = () => {
  const { user, isAuthenticated, userType } = useUser();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const getUserFromLocalStorage = () => {
    const savedUser = localStorage.getItem('transpolink_user');
    return savedUser ? JSON.parse(savedUser) : null;
  };

  const localUser = getUserFromLocalStorage();
  const token = localStorage.getItem('token');

  const isValidUserType = userType === 'truck_driver' || userType === 'businessman';

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🔍 User Account Debug Information
          </h1>

          {/* Authentication Status */}
          <div className="mb-8 p-4 rounded-lg bg-gray-50 border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              {isAuthenticated ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              Authentication Status
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Status:</strong>{' '}
                <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>
                  {isAuthenticated ? '✅ Logged In' : '❌ Not Logged In'}
                </span>
              </p>
            </div>
          </div>

          {/* User Type Validation */}
          {isAuthenticated && (
            <div className={`mb-8 p-4 rounded-lg border-l-4 ${
              isValidUserType ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
            }`}>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                {isValidUserType ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                )}
                User Type Validation
              </h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Current User Type:</strong>{' '}
                  <span className={`font-mono px-2 py-1 rounded ${
                    isValidUserType ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {userType || 'undefined'}
                  </span>
                </p>
                <p className="text-gray-700">
                  <strong>Is Valid:</strong>{' '}
                  <span className={isValidUserType ? 'text-green-600' : 'text-red-600'}>
                    {isValidUserType ? '✅ Yes' : '❌ No'}
                  </span>
                </p>
                {!isValidUserType && (
                  <div className="mt-4 p-3 bg-red-100 rounded-lg">
                    <p className="text-red-800 font-semibold">⚠️ Invalid User Type Detected!</p>
                    <p className="text-red-700 text-sm mt-2">
                      Valid user types are:
                    </p>
                    <ul className="list-disc list-inside text-red-700 text-sm mt-1">
                      <li><code className="bg-red-200 px-1 rounded">truck_driver</code> - For truck drivers</li>
                      <li><code className="bg-red-200 px-1 rounded">businessman</code> - For business owners</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* User Details from Context */}
          {isAuthenticated && user && (
            <div className="mb-8 p-4 rounded-lg bg-blue-50 border-l-4 border-blue-500">
              <h2 className="text-xl font-semibold mb-4">👤 User Details (from Context)</h2>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Name:</span>
                  <span className="font-semibold">{user.name || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Email:</span>
                  <span className="font-semibold">{user.email || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Phone:</span>
                  <span className="font-semibold">{user.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">User Type:</span>
                  <span className={`font-semibold px-2 py-1 rounded ${
                    isValidUserType ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.userType || 'undefined'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* LocalStorage Data */}
          {localUser && (
            <div className="mb-8 p-4 rounded-lg bg-purple-50 border-l-4 border-purple-500">
              <h2 className="text-xl font-semibold mb-4">💾 LocalStorage Data</h2>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">{JSON.stringify(localUser, null, 2)}</pre>
              </div>
              <button
                onClick={() => copyToClipboard(JSON.stringify(localUser, null, 2))}
                className="mt-3 flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copy to Clipboard
              </button>
            </div>
          )}

          {/* JWT Token Status */}
          <div className="mb-8 p-4 rounded-lg bg-yellow-50 border-l-4 border-yellow-500">
            <h2 className="text-xl font-semibold mb-4">🔑 JWT Token Status</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Token Exists:</strong>{' '}
                <span className={token ? 'text-green-600' : 'text-red-600'}>
                  {token ? '✅ Yes' : '❌ No'}
                </span>
              </p>
              {token && (
                <div className="mt-2">
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Token Preview:</strong>
                  </p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto">
                    <pre className="text-xs">{token.substring(0, 100)}...</pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">🛠️ Quick Actions</h2>
            
            {!isValidUserType && isAuthenticated && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">How to Fix Invalid User Type:</h3>
                <ol className="list-decimal list-inside text-sm text-red-700 space-y-2">
                  <li>Open terminal in backend folder</li>
                  <li>Run: <code className="bg-red-200 px-2 py-1 rounded">node fix-user-type.js {user?.email}</code></li>
                  <li>Logout from the application</li>
                  <li>Login again</li>
                  <li>Refresh this page to verify</li>
                </ol>
              </div>
            )}

            <button
              onClick={() => {
                console.log('User Context:', { user, isAuthenticated, userType });
                console.log('LocalStorage User:', localUser);
                console.log('Token:', token);
                toast.success('Check browser console for detailed logs');
              }}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              📋 Log All Data to Console
            </button>

            <button
              onClick={() => {
                const data = {
                  context: { user, isAuthenticated, userType },
                  localStorage: localUser,
                  hasToken: !!token
                };
                copyToClipboard(JSON.stringify(data, null, 2));
              }}
              className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              📄 Copy All Data
            </button>
          </div>

          {/* Recommendations */}
          {isAuthenticated && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">💡 Recommendations:</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {!isValidUserType && (
                  <li className="text-red-600 font-semibold">
                    ⚠️ Fix your user type immediately using the fix script
                  </li>
                )}
                {isValidUserType && userType === 'truck_driver' && (
                  <li className="text-green-600">
                    ✅ You can post trucks
                  </li>
                )}
                {isValidUserType && userType === 'businessman' && (
                  <li className="text-green-600">
                    ✅ You can post goods
                  </li>
                )}
                <li>Always logout and login after database changes</li>
                <li>Clear browser cache if issues persist</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDebug;
