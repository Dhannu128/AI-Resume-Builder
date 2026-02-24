import React, { useState } from 'react';
import { FaWifi, FaServer, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { testBackendConnection, baseURL } from '../api/ResumeService';
import toast from 'react-hot-toast';

const NetworkDiagnostics = () => {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState(null);

  const runDiagnostics = async () => {
    setTesting(true);
    setResults(null);

    const diagnostics = {
      apiUrl: baseURL,
      timestamp: new Date().toISOString(),
      tests: []
    };

    try {
      // Test 1: Basic connectivity
      console.log("🔍 Testing basic connectivity...");
      const connectionResult = await testBackendConnection();
      
      diagnostics.tests.push({
        name: "Backend Connectivity",
        status: connectionResult.success ? "success" : "failed",
        message: connectionResult.success 
          ? "✅ Backend server is reachable" 
          : `❌ ${connectionResult.error}`,
        details: connectionResult
      });

      // Test 2: CORS check
      try {
        const corsTest = await fetch(`${baseURL}/actuator/health`, {
          method: 'GET',
          mode: 'cors'
        });
        
        diagnostics.tests.push({
          name: "CORS Configuration",
          status: corsTest.ok ? "success" : "failed",
          message: corsTest.ok 
            ? "✅ CORS is properly configured" 
            : `❌ CORS issue detected (Status: ${corsTest.status})`,
          details: { status: corsTest.status, statusText: corsTest.statusText }
        });
      } catch (corsError) {
        diagnostics.tests.push({
          name: "CORS Configuration",
          status: "failed",
          message: `❌ CORS error: ${corsError.message}`,
          details: corsError
        });
      }

      // Test 3: API endpoint test
      try {
        const testDescription = "Test user for connectivity check";
        const apiTest = await fetch(`${baseURL}/api/v1/resume`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userDescription: testDescription })
        });

        diagnostics.tests.push({
          name: "API Endpoint Test",
          status: apiTest.ok ? "success" : "warning",
          message: apiTest.ok 
            ? "✅ API endpoint is responding" 
            : `⚠️ API returned status ${apiTest.status}`,
          details: { status: apiTest.status, statusText: apiTest.statusText }
        });
      } catch (apiError) {
        diagnostics.tests.push({
          name: "API Endpoint Test",
          status: "failed",
          message: `❌ API test failed: ${apiError.message}`,
          details: apiError
        });
      }

      setResults(diagnostics);
      
      const successCount = diagnostics.tests.filter(t => t.status === "success").length;
      const totalTests = diagnostics.tests.length;
      
      if (successCount === totalTests) {
        toast.success("🎉 All connectivity tests passed!");
      } else {
        toast.error(`⚠️ ${totalTests - successCount} tests failed. Check results below.`);
      }

    } catch (error) {
      console.error("Diagnostics error:", error);
      toast.error("Failed to run diagnostics");
    } finally {
      setTesting(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "success": return <FaCheckCircle className="text-success" />;
      case "failed": return <FaTimesCircle className="text-error" />;
      case "warning": return <FaTimesCircle className="text-warning" />;
      default: return <FaSpinner className="animate-spin" />;
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6 max-w-4xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">
          <FaWifi className="text-primary" />
          Network Diagnostics
        </h2>
        
        <div className="mb-6">
          <p className="text-base-content mb-2">
            <strong>Current API URL:</strong> {baseURL}
          </p>
          <p className="text-base-content text-sm opacity-70">
            Run diagnostics to check connectivity and identify network issues.
          </p>
        </div>

        <button 
          onClick={runDiagnostics}
          disabled={testing}
          className="btn btn-primary mb-6"
        >
          {testing ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Running Diagnostics...
            </>
          ) : (
            <>
              <FaServer className="mr-2" />
              Run Network Diagnostics
            </>
          )}
        </button>

        {results && (
          <div className="space-y-4">
            <div className="divider">Test Results</div>
            
            {results.tests.map((test, index) => (
              <div key={index} className="alert">
                <div className="flex items-center gap-3">
                  {getStatusIcon(test.status)}
                  <div className="flex-1">
                    <h3 className="font-semibold">{test.name}</h3>
                    <p className="text-sm">{test.message}</p>
                  </div>
                </div>
                
                {test.details && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm opacity-70">
                      Show Details
                    </summary>
                    <pre className="text-xs mt-2 p-2 bg-base-200 rounded overflow-auto">
                      {JSON.stringify(test.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}

            <div className="mt-6 p-4 bg-base-200 rounded-lg">
              <h3 className="font-semibold mb-2">Troubleshooting Tips:</h3>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>If backend connectivity fails, ensure your Spring Boot server is running</li>
                <li>For CORS issues, check that your frontend URL is in the backend's allowed origins</li>
                <li>For API endpoint failures, verify the backend API is properly deployed</li>
                <li>Check browser console for additional error details</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkDiagnostics;
