import { Route, Switch } from "wouter";
import Index from "./pages/index";
import ResultadoPage from "./pages/resultado";
import AdminPage from "./pages/admin";
import ZonaPage from "./pages/zona";
import BarrioPage from "./pages/barrio";
import BlogPage from "./pages/blog";
import ArticuloPage from "./pages/articulo";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";
import { Component, type ReactNode } from "react";

// Error Boundary global — evita pantalla negra en cualquier crash
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 16, padding: 40, maxWidth: 560, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ color: 'white', fontWeight: 900, fontSize: 22, marginBottom: 8 }}>Algo ha ido mal</h2>
            <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 12 }}>
              Ha ocurrido un error inesperado. Por favor, recarga la página e inténtalo de nuevo.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
            >
              Volver al inicio
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Provider>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/resultado" component={ResultadoPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/zona/:slug" component={ZonaPage} />
          <Route path="/barrio/:slug" component={BarrioPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/blog/:slug" component={ArticuloPage} />
        </Switch>
        {import.meta.env.DEV && <AgentFeedback />}
        {<RunableBadge />}
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
