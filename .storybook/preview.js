import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles, theme } from 'components';
import store from 'store/store';
import { dummyProductList } from 'dummy_data';
import { initializeProductList } from 'reducers/cartReducer';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
};
const dispatch = useDispatch();

export const decorators = [
  (Story, context) => {
    dispatch(initializeProductList({ products: dummyProductList }));

    return (
      <>
        <BrowserRouter>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <Story {...context} />
            </Provider>
          </ThemeProvider>
        </BrowserRouter>
      </>
    );
  },
];
