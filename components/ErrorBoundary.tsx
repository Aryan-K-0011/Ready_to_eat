import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center border border-red-100">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h1 className="font-heading text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong.</h1>
            <p className="text-gray-500 mb-6">We're sorry, but the application has encountered an unexpected error.</p>
            
            {this.state.error && (
              <div className="bg-red-50 text-red-800 text-left p-4 rounded-lg text-xs font-mono mb-6 overflow-auto max-h-48 border border-red-100">
                <p className="font-bold mb-2 text-sm">{this.state.error.toString()}</p>
                {this.state.errorInfo && (
                   <pre className="whitespace-pre-wrap text-[10px] opacity-80">{this.state.errorInfo.componentStack}</pre>
                )}
              </div>
            )}

            <button 
              onClick={() => window.location.reload()} 
              className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2 mx-auto shadow-lg shadow-green-100"
            >
              <RefreshCw size={18} /> Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}