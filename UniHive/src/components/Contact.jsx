// import React, { useState, useEffect, useNavigate } from 'react'
// //import {onAddTransaction} from './App'
// import { NavLink, Outlet, Form, redirect, useLoaderData } from "react-router-dom"
// import {AiOutlineComment} from "react-icons/ai";

// export default function Contact() {

//      const comLoader=useLoaderData();

//     return (

//         <>



//         <div className="contact">
//         <h3><AiOutlineComment/>Users Comments</h3>
//         <Form method="post" className="contact-form"  
//         >
          
//           <label className="contact-form-label" htmlFor="user">
//             <span>Your email:</span>
//             <input type="email" className="contact-form-input-textarea" name="user" id="user" required />
//           </label>
        
          
//           <label className="contact-form-label" htmlFor="Comment">
//             <span>Your message:</span>
//             <textarea name="Comment" id="Comment" className="contact-form-input-textarea" required></textarea>
//           </label>
         
//           <input
//           className="bg-blue-500 hover:bg-blue-600 text-white transition mt-4 py-2 cursor-pointer "
//           type="submit"
//         ></input>
//         </Form>
//       </div>








//       <div className="faq">

// {comLoader.map((transactionload) => (

// <div key={transactionload.id} className="question">
// <p><strong>{transactionload.user}</strong></p>
// <p>{transactionload.Comment}</p>
// </div>
// ))}

// </div>
//       </>

      

//     )
//   }


//   //Gets the budget data and posts it to db.json
// export async function contactAction({ request }) {
//     let formData = await request.formData();
//     let contactData = Object.fromEntries(formData);
    

//     //Gets the form data and addsa it to the db.json file.

//     const response = await fetch('http://localhost:4000/Comments', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(contactData)

//     });

//     return redirect('/help');
//     //Stays on the same page after executing
//     //return null;
// }

// export const contactLoader = async ({ params }) => {
//     //const { id } = params;


//     //Updates the data at the specified id
//     const res = await fetch('http://localhost:4000/Comments');

//     return res.json();
// }