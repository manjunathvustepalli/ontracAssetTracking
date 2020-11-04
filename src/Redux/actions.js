import {getnetwork} from '../Network'
export function get() {
  return (dispatch) => {
    dispatch(fetchProductsBegin());
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token e64b88ffc31676443bac50126e11a28e73b10e3bc49e9cb58c555c723f467687"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(
      "http://3.22.17.212:9000/api/v1/resManager/address/reasons/",
      requestOptions
    )
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          response
            .json()
            .then((result) => dispatch(fetchProductsSuccess(result)));
        } else {
          dispatch(fetchProductsFailure(response));
        }
      })
      .catch((error) => dispatch(fetchProductsFailure(error)));
  };
}
export const get1 = () => {
  return (dispatch) => {
    // dispatch(fetchProductsBegin());
    getnetwork(
      "http://3.22.17.212:9000/api/v1/resManager/address/reasons/",
      "Token e64b88ffc31676443bac50126e11a28e73b10e3bc49e9cb58c555c723f467687",
      ""
    ).then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        dispatch(fetchProductsSuccess(response.data));
      } else if (response.error) {
        dispatch(fetchProductsFailure(response.error));
      } else {
        console.log("error");
        dispatch(fetchProductsFailure(response));
      }
    });
  };
};
export function post(raw) {
  console.log("working from product actions", raw);
  return (dispatch) => {
    // dispatch(fetchProductsBegin());

    console.log("response from post");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token e64b88ffc31676443bac50126e11a28e73b10e3bc49e9cb58c555c723f467687"
    );
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ addressReason: raw }),
      redirect: "follow",
    };

    return fetch(
      "http://3.22.17.212:9000/api/v1/resManager/address/reasons/",
      requestOptions
    )
      .then((response) => {
        console.log("response from post", response);
        if (response.status >= 200 && response.status <= 299) {
          response.json().then((result) => dispatch(get1()));
        } else {
          // dispatch(fetchProductsFailure(response));
        }
      })
      .catch((error) => console.log(error));
  };
}
export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products },
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error },
});
