import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from 'react-query'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import { DetailPage } from './pages/DetailPage'
import { ListPage } from './pages/ListPage'
import store from './store'

const queryClient = new QueryClient()

export const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <BrowserRouter>
          <Switch>
            <Route path="/detail/:id" component={DetailPage} />
            <Route path="/" component={ListPage} />
          </Switch>
        </BrowserRouter>
      </AppLayout>
    </QueryClientProvider>
  </Provider>
)
