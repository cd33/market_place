import { useEffect } from "react";
import * as Input from "../Auth/Input";
import Payment from "./Payment";
import DeliveryBox from "./DeliveryBox";
import { useFormValidation } from "../../lib/hooks/useFormValidation";
import { setDelivery } from "../../lib/state/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectCartTotal } from "../../lib/state/selectors";

const defaultValues = {
  delivery: "standard",
  address: "",
};

const options = [
  "France",
  "Canada",
  "Russia",
  "United States",
  "India",
  "Afganistan",
];

const Checkout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { delivery } = useSelector(state => state.cart);
  const total = useSelector(selectCartTotal);
  const { first, last, email, city, country } = user ?? {};
  const { formValues, validate, handleOnChange, isValid } = useFormValidation({
    formName: "checkout",
    defaultValues,
  });

  useEffect(() => {
    validate(formValues["checkout"] ?? {});
  }, [validate, formValues]);

  const handleOnChangeDelivery = (e, value) => {
    handleOnChange(e, value);
    dispatch(setDelivery(value));
    const shippingCost = value === 'standard' ? 0 : 20
    localStorage.setItem("total", total + shippingCost);
  };

  return (
    <section
      className="section-content padding-y"
      style={{ margin: "100px auto", maxWidth: "720px" }}
    >
      <div className="container">
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title mb-3">Delivery info</h4>

            <div className="form-row">
              <div className="form-group col-sm-6">
                <DeliveryBox
                  title="standard"
                  value={delivery}
                  message="Free by airline within 20 days"
                  onChange={(e) => handleOnChangeDelivery(e, "standard")}
                />
              </div>
              <div className="form-group col-sm-6">
                <DeliveryBox
                  title="fast"
                  value={delivery}
                  message="Extra 20$ will be charged"
                  onChange={(e) => handleOnChangeDelivery(e, "fast")}
                />
              </div>
            </div>

            <div className="form-row">
              <Input.Text
                name="first"
                value={first}
                label="First name"
                onChange={handleOnChange}
              />
              <Input.Text
                name="last"
                value={last}
                label="Last name"
                onChange={handleOnChange}
              />
            </div>

            <div className="form-row">
              <Input.Email
                value={email}
                label="Email"
                onChange={handleOnChange}
                col="6"
              />
            </div>
            <div className="form-row">
              <Input.Select
                name="country"
                value={country}
                options={options}
                label="Country"
                col="6"
                onChange={handleOnChange}
              />
              <Input.Text
                name="city"
                value={city}
                label="City"
                onChange={handleOnChange}
              />
            </div>
            <Input.TextArea
              name="address"
              label="Address"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-row" style={{ padding: "0 25px 30px" }}>
            <Payment isValid={!isValid} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Checkout;
