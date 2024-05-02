const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');






    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items,
    //   mode: 'payment',
    //   success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${url}/`,
    // });

    // return { session: session.id };

module.exports = { typeDefs, resolvers };
