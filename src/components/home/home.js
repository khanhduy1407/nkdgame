import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import style from './home.module.css';
import Navbar from "../default/navbar";
import CardItem from "../default/carditem";
import webGameData from './webGame.json';
import desktopGameData from './desktopGame.json';

import available_amazon from '../../img/available_amazon.png';
import logo_windows from '../../img/logo_windows.png';
import logo_linux from '../../img/logo_linux.png';
import logo_mac from '../../img/logo_mac.png';

import svg_facebook from '../../svg/facebook.svg';
import svg_youtube from '../../svg/youtube.svg';
import svg_instagram from '../../svg/instagram.svg';

function ScrollTop(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

function Home(props) {
    const { t } = useTranslation();

    const logo = "https://raw.githubusercontent.com/khanhduy1407/khanhduy1407/main/avatar.png";
    const copyright = "© " + new Date().getFullYear() + " NKDuy. All Rights Reserved.";

    return (
        <main className={style.main}>
            <Helmet>
                <title>NKD Games - {t('home.title')}</title>
            </Helmet>

            <Navbar />

            <Toolbar id="back-to-top-anchor" />
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
                        {webGameData.map(item => (
                            <CardItem item={item} />
                        ))}
                    </div>
                </div>
            </section>

            <section className={style.sec} id="mobile">
                <div className={style.content}>
                    <div className={style.mxw800p}>
                        <h3>Mobile Games</h3>
                        <p>{t('home.content.mobile.android')}</p>
                        <a href="//www.amazon.com/s?rh=n%3A2350149011%2Cp_4%3ANKDuy" target="_blank"><img src={available_amazon} className={style.img_store} /></a>
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
                        {desktopGameData.map(item => (
                            <CardItem item={item} />
                        ))}
                    </div>
                </div>
            </section>

            <footer className={style.footer}>
                <div className={style.sci}>
                    <ul>
                        <li><a href="//www.youtube.com/DyGamerYT" target="_blank"><img src={svg_youtube} /></a></li>
                        <li><a href="//www.facebook.com/khanhduy1407" target="_blank"><img src={svg_facebook} /></a></li>
                        <li><a href="//www.instagram.com/dygameryt/" target="_blank"><img src={svg_instagram} /></a></li>
                    </ul>
                </div>
                <div className={style.moreUrl}>
                    <ul>
                        <li><a href="//paypal.me/nkduydev">{t('footer.donate')}</a></li>
                        <li><a href="/feedback">{t('footer.feedback')}</a></li>
                        <li><a href="/privacy">{t('footer.privacy')}</a></li>
                        <li><a href="/comments">{t('footer.comments')}</a></li>
                    </ul>
                </div>
                <div className={style.copyright}>
                    <p>{copyright}</p>
                </div>
            </footer>
            <ScrollTop {...props}>
                <Fab color="primary" size="medium" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </main>
    )
}

export default Home