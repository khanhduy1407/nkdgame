import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from 'react-i18next';
import { FacebookProvider, Comments } from 'react-facebook';
import style from './comments.module.css';

import svg_facebook from '../../svg/facebook.svg';
import svg_youtube from '../../svg/youtube.svg';
import svg_instagram from '../../svg/instagram.svg';

function CommentsPage() {
    const {t} = useTranslation();

    const copyright = "© " + new Date().getFullYear() + " NKDuy. All Rights Reserved.";

    return(
        <main className={style.commentsPage}>
            <Helmet>
                <title>NKD Games - {t('comments.title')}</title>
            </Helmet>

            <FacebookProvider appId="341050750834888">
                <Comments href="https://nkdgame.ga/" width="100%" numposts="10" />
            </FacebookProvider>

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
                        <li><a href="https://paypal.me/nkduydev">{t('footer.donate')}</a></li>
                        <li><a href="/feedback">{t('footer.feedback')}</a></li>
                        <li><a href="//github.com/khanhduy1407/nkdgame/blob/master/LICENSE.md" target="_blank">{t('footer.license')}</a></li>
                        <li><a href="/comments">{t('footer.comments')}</a></li>
                    </ul>
                </div>
                <div className={style.copyright}>
                    <p>{copyright}</p>
                </div>
            </footer>
        </main>
    )
}

export default CommentsPage