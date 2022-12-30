// import React from "react";
// import ContactForm from "../containers/ContactForm";
// import ContactList from "../containers/ContactList";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faContactBook } from '@fortawesome/free-solid-svg-icons'



// export default function ContactBox() {
//     return (
//         <div>
//             <div className="container shadow">
//                 <div className="card">
//                     <div className="card-header">
//                         <h1 className="text-center font"><FontAwesomeIcon icon={faContactBook} /> Phone Book Apps</h1>
//                     </div>
//                     <div className="card-body">
//                         <ContactForm onSearch={this.searchContact} />
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 <div className="container px-6" >
//                     <ContactList pagination={this.loadPagination}/>
//                 </div>
//             </div>
//         </div>
//     )
// }


import React from "react";
import ContactForm from "../containers/ContactForm";
import ContactList from "../containers/ContactList";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faContactBook } from '@fortawesome/free-solid-svg-icons'



export default function ContactBox() {
    return (
        <div>
            <div className="container shadow">
                <div className="card">
                    <div className="card-header">
                        <h1 className="text-center font"><FontAwesomeIcon icon={faContactBook} /> Phone Book Apps</h1>
                    </div>
                    <div className="card-body">
                        <ContactForm />
                    </div>
                </div>
            </div>
            <div>
                <div className="container px-6" >
                    <ContactList />
                </div>
            </div>
        </div>
    )
}
