import { CART_ACTIONS, PRODUCT_LIST_ACTIONS, ORDER_ACTIONS } from 'actions/action';

const initState = {
  products: [],
  shoppingCart: [],
  order: [],
};

function cartReducer(state = initState, action) {
  switch (action.type) {
    case PRODUCT_LIST_ACTIONS.INITIALIZE:
      return {
        ...state,
        products: [...action.products],
      };

    case CART_ACTIONS.INITIALIZE:
      return {
        ...state,
        shoppingCart: [...action.shoppingCart],
      };

    case CART_ACTIONS.PUT:
      const isExist = state.shoppingCart.some(product => product.productId === action.productId);

      return {
        ...state,
        shoppingCart: isExist
          ? state.shoppingCart.map(product =>
              product.productId === action.productId
                ? { ...product, quantity: action.quantity }
                : product,
            )
          : state.shoppingCart.concat({
              productId: action.productId,
              name: action.name,
              price: action.price,
              image: action.image,
              quantity: action.quantity,
            }),
        order: isExist ? state.order : [...state.order, action.productId],
      };

    case CART_ACTIONS.DELETE:
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(product => product.productId !== action.productId),
        order: state.order.filter(productId => productId !== action.productId),
      };

    case CART_ACTIONS.SELECTIVE_DELETE:
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(
          product => !state.order.includes(product.productId),
        ),
        order: [],
      };

    case ORDER_ACTIONS.ADD:
      return {
        ...state,
        order: [...state.order, action.id],
      };

    case ORDER_ACTIONS.DELETE:
      return {
        ...state,
        order: state.order.filter(productId => productId !== action.id),
      };

    case ORDER_ACTIONS.INITIALIZE:
      return {
        ...state,
        order: [],
      };

    case ORDER_ACTIONS.DECISION:
      return {
        ...state,
        orderList: action.orderList,
      };

    default:
      return state;
  }
}

export default cartReducer;
