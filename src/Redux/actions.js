import {getnetwork,postnetwork} from '../Network'
export function get() {
  return (dispatch) => {
    dispatch(fetchProductsBegin());
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token bb8a5dfea91dd4c1a3097ccc306245b078e719cfbf40cda1ced039f69711c40d"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(
      process.env.REACT_APP_URL+"resManager/address/reasons/",
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
      process.env.REACT_APP_URL+"resManager/address/reasons/",
      "Token bb8a5dfea91dd4c1a3097ccc306245b078e719cfbf40cda1ced039f69711c40d",
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
      "Token bb8a5dfea91dd4c1a3097ccc306245b078e719cfbf40cda1ced039f69711c40d"
    );
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ addressReason: raw }),
      redirect: "follow",
    };

    return fetch(
      process.env.REACT_APP_URL+"resManager/address/reasons/",
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
export const post1=(raw)=>{

  return (dispatch)=>{
    postnetwork(
      process.env.REACT_APP_URL+"resManager/address/reasons/",
      "Token bb8a5dfea91dd4c1a3097ccc306245b078e719cfbf40cda1ced039f69711c40d",
      raw
    ).then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        dispatch(get1());
      } else if (response.error) {
        // dispatch(fetchProductsFailure(response.error));
      } else {
        console.log("error");
        // dispatch(fetchProductsFailure(response));
      }
    });
  }

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
