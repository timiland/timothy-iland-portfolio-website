import getStripe from "./getStripe"


export default const redirectToCheckout = async () => {

    const {
        data: {id},
    } = await axios.post('/api/checkout', {

items: Object.entries(cartDetails).map(([_,{id, quantity}]) => ({
    price: id,
    quantity,
}))
    })

    const stripe = await getStripe();
    await stripe?.redirectToCheckout({sessionId: id})


    // const submitVote = async (e) => {
    //     e.preventDefault();
    
    //     try {
    //       const response = await fetch(`/api/vote/${id}`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       });
    
    //       if (response.ok) {
    //         const data = await response.json();
    //         console.log('Response data:', data);
    //       } else {
    //         console.error('Error:', response.statusText);
    //       }
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   };

}