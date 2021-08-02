import React from "react";
import { Helmet } from "react-helmet";
import style from './style_404.module.css';
import { useTranslation } from 'react-i18next';

import plane from '../../img/plane.png';

function Page_404() {
    const { t } = useTranslation();

    return (
        <main className={style.main}>
            <Helmet>
                <title>NKD Games - {t('error.title')} 404</title>
            </Helmet>

            <div className={style.sky}>
                <h2><span>4</span><span>0</span><span>4</span></h2>
                <div className={style.grass} />
                <img src={plane} className={style.plane} />
            </div>
            <div className={style.field}>
                <h2>{t('error.desc')}</h2>
                <a href="/">{t('error.btn')}</a>
            </div>
        </main>
    )
}

export default Page_404