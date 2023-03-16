import { AuthProvider } from './AuthContext';
import MyRoutes from './Routes';

function App() {
  return (
    <AuthProvider>
      <MyRoutes />
    </AuthProvider>
  );
}

export default App;
