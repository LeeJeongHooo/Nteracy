import { Accordion } from "./components/common/accordion";
import { Container } from "./components/common/container";
import { Header } from "./components/header";
import { Content } from "./components/content";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./components/content/auth/AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      retry: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Container>
          <Accordion>
            <Accordion.Item value="Nteracy">
              <Accordion.Header>
                <Accordion.Trigger>
                  <Header />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                <Content />
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </Container>
      </AuthProvider>
    </QueryClientProvider>
  );
};
export default App;
