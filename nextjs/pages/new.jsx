import React from 'react';
import Link from 'next/link';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";

@inject('environmentStore')
@observer
class New extends React.Component {
    constructor(props) {
        super(props);
    }

    changeLanguage = () => {
        const { environmentStore } = this.props;
        const { language } = environmentStore;

        if (language === 'en') {
            environmentStore.setLanguage('ko');
        } else {
            environmentStore.setLanguage('en');
        }
    }

    render() {
        const { environmentStore, i18n } = this.props;
        const { queryString } = environmentStore;

        return (
            <div>
                <Link href={`/${queryString}`}><a>goto Home!.</a></Link>
                {i18n.t('hello')}
                {queryString}
                <button onClick={this.changeLanguage}>Change Language</button>
            </div>
        );
    }
}

export default withTranslation()(New);