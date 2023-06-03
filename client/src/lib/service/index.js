import axios from "axios";

// GET
export const getProducts = () => {
  return new Promise((onSuccess, onFail) => {
    axios
      .get("/api/products")
      .then((response, error) => {
        if (!response || error) {
          onFail(`Response Failure : ${error}`);
        }
        onSuccess(response);
      })
      .catch((error) => onFail(error));
  });
};

export const getUser = (email) => {
  return new Promise((onSuccess, onFail) => {
    axios
      .get("/api/user", email)
      .then((response, error) => {
        if (!response || error) {
          onFail(`Response Failure : ${error}`);
        }
        onSuccess(response.data);
      })
      .catch((error) => onFail(error));
  });
};

// POST
export const addUser = (user) => {
  return new Promise((onSuccess, onFail) => {
    axios
      .post("/api/users/add", user)
      .then((response, error) => {
        if (!response || error) {
          onFail(`Response Failure : ${error}`);
        }
        onSuccess("User added");
      })
      .catch((error) => onFail(error));
  });
};

export const addOrder = (order) => {
  return new Promise((onSuccess, onFail) => {
    axios
      .post("/api/orders/add", order)
      .then((response, error) => {
        if (!response || error) {
          return onFail(`Response Failure : ${error}`);
        }
        onSuccess("Order added");
      })
      .catch((err) => onFail(err));
  });
};

// export const addProduct = (product) => {
//   return new Promise((onSuccess, onFail) => {
//     axios
//       .post("/api/products/add", product)
//       .then((response, error) => {
//         if (!response || error) {
//           onFail(`Response Failure : ${error}`);
//         }
//         onSuccess("Product added");
//       })
//       .catch((error) => onFail(error));
//   });
// };

// STRIPE
export const processPayment = (order) => {
  return new Promise((onSuccess, onFail) => {
    axios
      .post("/api/create-checkout-session", order)
      .then((response) => {
        window.location.href = response.data.url;
        onSuccess("Redirection");
      })
      .catch((error) => onFail(`Response Failure : ${error}`));
  });
};
