export default function Contact() {
const onSubmit = (e) => {
    e.preventDefault();
    alert('Submitted (demo)');
};

return (
    <>
    <div className="contact-details">
    <p>
    For more details or help. Reach out to us so we can assist you with any concerns or questions.
    </p>
    </div>
        <div className="form">
        <form id="contact" onSubmit={onSubmit} noValidate>
            <div className="form-identity">
            <label htmlFor="name">Full Name</label>
            <input id="name" className="form-input--border" placeholder="John Doe" autoComplete="name" />
            <p className="contactError" id="nameError"></p>

            <label htmlFor="phone">Phone Number</label>
            <input id="phone" className="form-input--border" placeholder="111-222-3333" maxLength={10} autoComplete="tel" />
            <p className="contactError" id="phoneError"></p>

            <label htmlFor="email">Email</label>
            <input id="email" className="form-input--border" placeholder="example@email.com" autoComplete="email" />
            <p className="contactError" id="emailError"></p>
            </div>

            <div className="form-comment">
            <label htmlFor="comment">Comment</label>
            <textarea id="comment" className="form-input--border" placeholder="Comment here" rows={8} />
            </div>

            <div className="form-submit">
            <button id="submit" type="submit">SUBMIT</button>
            </div>
        </form>
    </div>
</>
);
}
