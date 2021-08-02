import React from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import firebase from "../../service/firebase";
import { useTranslation } from 'react-i18next';
import style from './feedback.module.css';

import svg_facebook from '../../svg/facebook.svg';
import svg_youtube from '../../svg/youtube.svg';
import svg_instagram from '../../svg/instagram.svg';

function Feedback() {
    const {t} = useTranslation();

    let history = useHistory();

    const sendFeedback = async () => {
        document.getElementById("btn").style.display = "none";
        document.getElementById("waiting").style.display = "inline-block";

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (name.length == 0 || email.length == 0 || message.length == 0) {
            alert("Invalid information")
        } else if (!email.match(pattern)) {
            alert("Email is invalid")
        } else {
            firebase.firestore().collection("feedback")
                .add({
                    name: name,
                    email: email,
                    message: message,
                })
                .then(() => {
                    alert("Send feedback successful.");
                    history.push("/");
                })
                .catch((error) => {
                    alert("Error: " + error);
                    document.getElementById("btn").style.display = "inline-block";
                    document.getElementById("waiting").style.display = "none";
                })
        }
    }

    const checkEmail = () => {
        const form = document.getElementById("form");
        const email = document.getElementById("email").value;
        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (email == "") {
            form.classList.remove('feedback_invalid__2m2VY');
        } else if (email.match(pattern)) {
            form.classList.remove('feedback_invalid__2m2VY');
        } else {
            form.classList.add('feedback_invalid__2m2VY');
        }
    }

    const copyright = "© " + new Date().getFullYear() + " NKDuy. All Rights Reserved.";

    return (
        <main>
            <Helmet>
                <title>NKD Games - {t('feedback.title')}</title>
            </Helmet>

            <section className={style.contact}>
                <div className={style.content}>
                    <div className={style.mxw800p}>
                        <h3>{t('feedback.h3')}</h3>
                        <p>{t('feedback.p')}</p>
                    </div>
                    <div className={style.contactForm}>
                        <div className={style.form} id="form">
                            <div className={style.row100}>
                                <div className={style.inputBx50}><input type="text" id="name" placeholder={t('feedback.input.fullName')} /></div>
                                <div className={style.inputBx50}><input type="email" className={style.email} id="email" placeholder={t('feedback.input.email')} onKeyUp={checkEmail} /></div>
                            </div>
                            <div className={style.row100}>
                                <div className={style.inputBx100}><textarea id="message" placeholder={t('feedback.input.message')} /></div>
                            </div>
                            <div className={style.row100}>
                                <div className={style.inputBx100}>
                                    <button id="btn" className={style.submitBtn} onClick={sendFeedback}>{t('feedback.input.send')}</button>
                                    <svg className={style.waiting} id="waiting">
                                        <circle cx="20" cy="20" r="20" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.sci}>
                        <ul>
                            <li><a href="https://www.youtube.com/DyGamerYT" target="_blank"><img src={svg_youtube} /></a></li>
                            <li><a href="https://www.facebook.com/khanhduy1407" target="_blank"><img src={svg_facebook} /></a></li>
                            <li><a href="https://www.instagram.com/dygameryt/" target="_blank"><img src={svg_instagram} /></a></li>
                        </ul>
                    </div>
                    <div className={style.moreUrl}>
                        <ul>
                            <li><a href="/feedback">{t('footer.feedback')}</a></li>
                            <li><a href="//github.com/khanhduy1407/nkdgame/blob/master/LICENSE.md" target="_blank">{t('footer.license')}</a></li>
                            <li><a href="/comments">{t('footer.comments')}</a></li>
                        </ul>
                    </div>
                    <div className={style.copyright}>
                        <p>{copyright}</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Feedback