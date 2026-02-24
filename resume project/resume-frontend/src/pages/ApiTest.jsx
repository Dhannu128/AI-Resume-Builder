import React, { useState, useEffect } from 'react';
import { FaServer, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { testBackendConnection, generateResume, baseURL } from '../api/ResumeService';
import toast from 'react-hot-toast';

const ApiTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('idle');
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Auto-test connection on component mount
    testConnection();
  }, []);

  const testConnection = async () => {
    setConnectionStatus('testing');
    try {
      const result = await testBackendConnection();
      setConnectionStatus(result.success ? 'success' : 'failed');
      setTestResults(result);
      
      if (result.success) {
        toast.success('✅ Backend connection successful!');
      } else {
        toast.error(`❌ Connection failed: ${result.error}`);
      }
    } catch (error) {
      setConnectionStatus('failed');
      setTestResults({ success: false, error: error.message });
      toast.error(`❌ Connection test failed: ${error.message}`);
    }
  };

  const testResumeGeneration = async () => {
    setLoading(true);
    try {
      const testDescription = "I am a software engineer with 3 years of experience in Java and Spring Boot. I have worked on REST APIs and microservices architecture.";
      
      console.log('🧪 Testing resume generation...');
      const result = await generateResume(testDescription);
      
      if (result.success) {
        toast.success('✅ Resume generation test successful!');
        console.log('✅ Test resume data:', result.data);
      } else {
        toast.error(`❌ Resume generation failed: ${result.error}`);
        console.error('❌ Test failed:', result.error);
      }
    } catch (error) {
      toast.error(`❌ Test error: ${error.message}`);
      console.error('❌ Test error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'success':
        return <FaCheckCircle className="text-success text-2xl" />;
      case 'failed':
        return <FaTimesCircle className="text-error text-2xl" />;
      case 'testing':
        return <FaSpinner className="animate-spin text-primary text-2xl" />;
      default:
        return <FaServer className="text-base-content text-2xl" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-8">
            <h1 className="text-3xl font-bold text-center mb-8">
              <FaServer className="inline mr-3 text-primary" />
              API Connection Test
            </h1>

            {/* Connection Status */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                {getStatusIcon()}
                <div>
                  <h2 className="text-xl font-semibold">Backend Connection</h2>
                  <p className="text-base-content opacity-70">
                    Status: {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
                  </p>
                </div>
              </div>
              
              <div className="bg-base-200 p-4 rounded-lg mb-4">
                <p className="text-sm">
                  <strong>API URL:</strong> {baseURL}
                </p>
                <p className="text-sm">
                  <strong>Environment:</strong> {import.meta.env.MODE}
                </p>
              </div>

              {testResults && (
                <div className="alert alert-info">
                  <div>
                    <h3 className="font-semibold">Connection Test Results</h3>
                    <p className="text-sm">
                      {testResults.success ? 
                        '✅ Backend server is reachable and responding' : 
                        `❌ ${testResults.error}`
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Test Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                onClick={testConnection}
                disabled={connectionStatus === 'testing'}
                className="btn btn-primary"
              >
                {connectionStatus === 'testing' ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Testing...
                  </>
                ) : (
                  <>
                    <FaServer className="mr-2" />
                    Test Connection
                  </>
                )}
              </button>

              <button 
                onClick={testResumeGeneration}
                disabled={loading || connectionStatus !== 'success'}
                className="btn btn-secondary"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Testing...
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="mr-2" />
                    Test Resume Generation
                  </>
                )}
              </button>
            </div>

            {/* Troubleshooting Guide */}
            <div className="divider">Troubleshooting Guide</div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-lg">🔧 Backend Issues</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Ensure Spring Boot server is running</li>
                    <li>• Check if port 8080 is accessible</li>
                    <li>• Verify Railway deployment is active</li>
                    <li>• Check server logs for errors</li>
                  </ul>
                </div>
              </div>

              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-lg">🌐 Network Issues</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Check internet connection</li>
                    <li>• Verify CORS configuration</li>
                    <li>• Check firewall settings</li>
                    <li>• Try different network/VPN</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Environment Info */}
            <div className="mt-8 p-4 bg-base-200 rounded-lg">
              <h3 className="font-semibold mb-2">Environment Information:</h3>
              <div className="text-sm space-y-1">
                <p><strong>Mode:</strong> {import.meta.env.MODE}</p>
                <p><strong>API URL:</strong> {baseURL}</p>
                <p><strong>Dev Mode:</strong> {import.meta.env.DEV ? 'Yes' : 'No'}</p>
                <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTest;
