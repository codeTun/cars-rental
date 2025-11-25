'use client';

import { useEffect, useState } from 'react';
import { healthAPI, carsAPI, rentersAPI, rentalsAPI } from '@/lib/api-client';

export default function TestConnection() {
  const [results, setResults] = useState<any>({
    envCheck: null,
    health: null,
    cars: null,
    renters: null,
    rentals: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runTests();
  }, []);

  const runTests = async () => {
    setLoading(true);
    const newResults: any = {};

    // Test 1: Check env variable
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    newResults.envCheck = {
      success: !!apiUrl,
      data: apiUrl || 'Not set',
      message: apiUrl ? '✅ Environment variable is set' : '❌ Environment variable missing'
    };

    // Test 2: Health check
    try {
      const health = await healthAPI.check();
      newResults.health = {
        ...health,
        message: health.success ? '✅ Backend is running' : '❌ Backend not responding'
      };
    } catch (error) {
      newResults.health = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: '❌ Backend not reachable'
      };
    }

    // Test 3: Get cars
    try {
      const cars = await carsAPI.getAll();
      newResults.cars = {
        ...cars,
        message: cars.success 
          ? `✅ Cars API working (${cars.data?.length || 0} cars)` 
          : '❌ Cars API failed'
      };
    } catch (error) {
      newResults.cars = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: '❌ Cars API not reachable'
      };
    }

    // Test 4: Get renters
    try {
      const renters = await rentersAPI.getAll();
      newResults.renters = {
        ...renters,
        message: renters.success 
          ? `✅ Renters API working (${renters.data?.length || 0} renters)` 
          : '❌ Renters API failed'
      };
    } catch (error) {
      newResults.renters = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: '❌ Renters API not reachable'
      };
    }

    // Test 5: Get rentals
    try {
      const rentals = await rentalsAPI.getAll();
      newResults.rentals = {
        ...rentals,
        message: rentals.success 
          ? `✅ Rentals API working (${rentals.data?.length || 0} rentals)` 
          : '❌ Rentals API failed'
      };
    } catch (error) {
      newResults.rentals = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: '❌ Rentals API not reachable'
      };
    }

    setResults(newResults);
    setLoading(false);
  };

  const allPassed = Object.values(results).every((r: any) => r?.success);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              🔗 Backend Connection Test
            </h1>
            <button
              onClick={runTests}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Run Tests Again'}
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Running connection tests...</p>
            </div>
          ) : (
            <>
              <div className={`mb-8 p-6 rounded-lg ${allPassed ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
                <h2 className={`text-2xl font-bold ${allPassed ? 'text-green-800' : 'text-red-800'}`}>
                  {allPassed ? '✅ All Tests Passed!' : '❌ Some Tests Failed'}
                </h2>
                <p className={`mt-2 ${allPassed ? 'text-green-700' : 'text-red-700'}`}>
                  {allPassed 
                    ? 'Your frontend is successfully connected to the FastAPI backend!' 
                    : 'There are connection issues. Check the details below.'}
                </p>
              </div>

              <div className="space-y-4">
                <TestResult
                  title="1. Environment Variable"
                  result={results.envCheck}
                  details={`API URL: ${results.envCheck?.data}`}
                />

                <TestResult
                  title="2. Backend Health Check"
                  result={results.health}
                  details={results.health?.data ? `Status: ${results.health.data.status}` : null}
                />

                <TestResult
                  title="3. Cars API"
                  result={results.cars}
                  details={results.cars?.data ? `Found ${results.cars.data.length} cars in database` : null}
                />

                <TestResult
                  title="4. Renters API"
                  result={results.renters}
                  details={results.renters?.data ? `Found ${results.renters.data.length} renters in database` : null}
                />

                <TestResult
                  title="5. Rentals API"
                  result={results.rentals}
                  details={results.rentals?.data ? `Found ${results.rentals.data.length} rentals in database` : null}
                />
              </div>

              {!allPassed && (
                <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="text-lg font-bold text-yellow-900 mb-3">
                    🔧 Troubleshooting Steps:
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-yellow-800">
                    <li>Make sure backend is running: <code className="bg-yellow-100 px-2 py-1 rounded">START_BACKEND.bat</code></li>
                    <li>Check backend is at: <a href="http://localhost:8000/docs" target="_blank" className="text-blue-600 underline">http://localhost:8000/docs</a></li>
                    <li>Verify <code className="bg-yellow-100 px-2 py-1 rounded">.env.local</code> file exists</li>
                    <li>Restart Next.js after creating <code className="bg-yellow-100 px-2 py-1 rounded">.env.local</code></li>
                    <li>Check browser console (F12) for errors</li>
                  </ol>
                </div>
              )}

              {allPassed && (
                <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">
                    🎉 What's Next?
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-blue-800">
                    <li>Your frontend is connected to the FastAPI backend</li>
                    <li>Try creating a car, renter, or rental</li>
                    <li>All operations will now use the backend API</li>
                    <li>Check backend terminal to see API logs</li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

function TestResult({ title, result, details }: { title: string; result: any; details?: string | null }) {
  if (!result) return null;

  return (
    <div className={`p-4 rounded-lg border-2 ${result.success ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`font-bold ${result.success ? 'text-green-900' : 'text-red-900'}`}>
            {title}
          </h3>
          <p className={`mt-1 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
            {result.message}
          </p>
          {details && (
            <p className={`mt-1 text-sm ${result.success ? 'text-green-600' : 'text-red-600'}`}>
              {details}
            </p>
          )}
          {result.error && (
            <p className="mt-2 text-sm text-red-600 font-mono bg-red-100 p-2 rounded">
              Error: {result.error}
            </p>
          )}
        </div>
        <span className="text-2xl ml-4">
          {result.success ? '✅' : '❌'}
        </span>
      </div>
    </div>
  );
}


