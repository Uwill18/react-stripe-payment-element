import { useEffect, useState } from "react";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import {Elements} from "@stripe/react-stripe-js";


function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  //obtains publishableKey info
  useEffect(()=>{
    fetch("/config").then( async(r) =>{
      const {publishableKey} = await r.json(); //storing json result in publishable key variable
      console.log(publishableKey);
      setStripePromise(loadStripe(publishableKey));
    })
  },[]);

  //obtains client Secret information
  useEffect(()=>{
    fetch("/create-payment-intent",{
      method: "POST",
      body: JSON.stringify({}),
    }).then( async(r) =>{
      const {clientSecret} = await r.json(); //storing json result in publishable key variable
      setClientSecret(clientSecret);
    })
  },[]);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {stripePromise && clientSecret && (
         <Elements stripe={stripePromise} options={{clientSecret}}>
         <CheckoutForm/>
        </Elements>
      )}
     
    </>
  );
}

export default Payment;
