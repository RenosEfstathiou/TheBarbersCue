import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Contact.css';

const Contact = ()=> {
    return (
        <div className="contact-template">
            <h2 className="contact-title">Επικοινωνήστε μαζί μας</h2>
            <div className="contact-wrapper">
                <div className="contact-info">
                    <h2>Τρόποι Επικοινωνίας</h2>
                    <div className="contact-phone">
                        <h3>Τηλέφωνο : </h3>
                        <p>231 053 6353</p>
                    </div>
                    <div className="contact-fb">
                        <h3>Facebook :</h3>
                        <a href="https://www.facebook.com/thebarberscue/">The Barbers Cue</a>
                    </div>

                </div>  
                <div className="contact-map-wrapper">
                    <h3 className="address">Address :</h3>
                    <p>Καραολή και Δημητρίου των Κυπρίων 20 Thessaloníki, Greece</p>
                    <Link
                     to="https://www.google.com/maps/place/Karaoli+ke+Dimitriou+Ton+Kiprion+20,+Thessaloniki+546+30/@40.64039,22.9385943,17z/data=!4m13!1m7!3m6!1s0x14a839a687a76489:0x1b1921d89eac9134!2sKaraoli+ke+Dimitriou+Ton+Kiprion+20,+Thessaloniki+546+30!3b1!8m2!3d40.6403133!4d22.9385228!3m4!1s0x14a839a687a76489:0x1b1921d89eac9134!8m2!3d40.6403133!4d22.9385228"
                     >
                         <iframe title="contactmap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.5234665505336!2d22.93859429638067!3d40.64039001669558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a839a687a76489%3A0x1b1921d89eac9134!2sKaraoli%20ke%20Dimitriou%20Ton%20Kiprion%2020%2C%20Thessaloniki%20546%2030!5e0!3m2!1sen!2sgr!4v1598635367227!5m2!1sen!2sgr" className="contact-map" ></iframe>
                     </Link>
                </div>
            </div>
        </div>
    )
}

export default Contact;