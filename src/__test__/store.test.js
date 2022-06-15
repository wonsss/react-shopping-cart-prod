import { legacy_createStore as createStore } from 'redux';
import rootReducer from 'store/rootReducer';

import { dummyProductList } from 'dummy_data';
import { addProductToOrder, deleteProductFromCart, deleteProductFromOrder, initializeOrder, initializeProductList, putProductToCart } from 'reducers/cartReducer';

describe('reducer 테스트', () => {
  let store;
  const [targetProduct] = dummyProductList;

  beforeEach(() => {
    store = createStore(rootReducer);
    store.subscribe(() => store.getState());

    store.dispatch(initializeProductList({ products: dummyProductList }));

    expect(store.getState().reducer.products).toHaveLength(dummyProductList.length);
  });

  test('상품 목록을 초기화할 수 있다.', () => {
    store.dispatch(initializeProductList({ products: dummyProductList }));

    expect(store.getState().reducer.products).toHaveLength(dummyProductList.length);
  });

  test('카트에 특정 상품을 추가할 수 있다.', () => {
    const quantity = 3;

    store.dispatch(putProductToCart({ id: targetProduct.id, quantity }));

    expect(store.getState().reducer.shoppingCart).toHaveLength(1);
    expect(store.getState().reducer.shoppingCart[0].id).toBe(targetProduct.id);
    expect(store.getState().reducer.shoppingCart[0].quantity).toBe(quantity);
  });

  test('카트에서 특정 상품을 삭제할 수 있다.', () => {
    const quantity = 3;

    store.dispatch(putProductToCart({ id: targetProduct.id, quantity }));
    store.dispatch(deleteProductFromCart({ id: targetProduct.id }));

    expect(store.getState().reducer.shoppingCart).toHaveLength(0);
  });

  test('특정 상품을 주문 목록에 추가할 수 있다.', () => {
    store.dispatch(addProductToOrder({ id: targetProduct.id }));

    expect(store.getState().reducer.order).toHaveLength(1);
    expect(store.getState().reducer.order[0]).toBe(targetProduct.id);
  });

  test('특정 상품을 주문 목록에서 제거할 수 있다.', () => {
    store.dispatch(addProductToOrder({ id: targetProduct.id }));
    store.dispatch(deleteProductFromOrder{ id: targetProduct.id }));

    expect(store.getState().reducer.order).toHaveLength(0);
  });

  test('주문목록을 초기화할 수 있다.', () => {
    store.dispatch(addProductToOrder({ id: targetProduct.id }));
    store.dispatch(initializeOrder());

    expect(store.getState().reducer.order).toHaveLength(0);
  });
});
