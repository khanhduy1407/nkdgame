import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from 'react-i18next';
import style from './home.module.css';
import webGameData from './webGame.json';
import desktopGameData from './desktopGame.json';

import logo from '../../img/logo.png';
import available_amazon from '../../img/available_amazon.png';
import logo_windows from '../../img/logo_windows.png';
import logo_linux from '../../img/logo_linux.png';
import logo_mac from '../../img/logo_mac.png';

import svg_facebook from '../../svg/facebook.svg';
import svg_youtube from '../../svg/youtube.svg';
import svg_instagram from '../../svg/instagram.svg';

function Home() {
    const { t } = useTranslation();

    function script() {
        window.addEventListener("scroll", function() {
            const header = document.querySelector("header");
            header.classList.toggle("home_sticky__12dko", window.scrollY > 0);
        })
    }

    function toggle() {
        const header = document.querySelector("header");
        header.classList.toggle("home_active__3p_h-");
    }

    const copyright = "© " + new Date().getFullYear() + " NKDuy. All Rights Reserved.";

    return (
        <main className={style.main}>
            <Helmet>
                <title>NKD Games - {t('home.title')}</title>
            </Helmet>

            <header id="header">
                <a href="/" className={style.logo}><img src={logo} />NKD Games</a>
                <ul>
                    <li><a href="#home" onClick={toggle}>Home</a></li>
                    <li><a href="#web" onClick={toggle}>Web</a></li>
                    <li><a href="#mobile" onClick={toggle}>Mobile</a></li>
                    <li><a href="#desktop" onClick={toggle}>Desktop</a></li>
                </ul>
                <div className={style.toggle} onClick={toggle} />
            </header>

            <section className={style.banner} id="home">
                <h2>Just For Fun</h2>
            </section>

            <section className={style.sec} id="web">
                <div className={style.content}>
                    <div className={style.mxw800p}>
                        <h3>Web Games</h3>
                        <p>{t('home.content.web.p')}</p>
                    </div>
                    <div className={style.webGameBox}>
                        {webGameData.map((game, index) => {
                            return (
                                <div className={style.box}>
                                    <a href={game.path} className={style.btn}>
                                        <div className={style.logoBx}><img src={game.img} /></div>
                                        <div className={style.textBx}><h2>{game.title}</h2></div>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className={style.sec} id="mobile">
                <div className={style.content}>
                    <div className={style.mxw800p}>
                        <h3>Mobile Games</h3>
                        <p>{t('home.content.mobile.android')}</p>
                        <a href="https://www.amazon.com/s?rh=n%3A2350149011%2Cp_4%3ANKDuy" target="_blank"><img src={available_amazon} className={style.img_store} /></a>
                        <p/>
                        <p>{t('home.content.mobile.ios')}</p>
                    </div>
                </div>
            </section>

            <section className={style.sec} id="desktop">
                <div className={style.content}>
                    <div className={style.mxw800p}>
                        <h3>Desktop Games</h3>
                        <p>{t('home.content.desktop.p')}</p>
                    </div>
                    <div className={style.desktopGameBox}>
                        {desktopGameData.map((game, index) => {
                            return (
                                <div className={style.dtBox}>
                                    <img src={game.img} />
                                    <h2>{game.title}</h2>
                                    <div className={style.btnDtDownload}>
                                        <a href={game.windows}><img src={logo_windows} /></a>
                                        {/*<a href={game.linux}><img src={logo_linux} /></a>*/}
                                        {/*<a href={game.mac}><img src={logo_mac} /></a>*/}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <footer className={style.footer}>
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
            </footer>

            <script type="text/javascript">{script()}</script>
        </main>
    )
}

export default Home