import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AnnotationApp from './components/AnnotationApp';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnnotationApp />
    </QueryClientProvider>
  );
}

export default App;
