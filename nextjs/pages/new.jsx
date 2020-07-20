import React from 'react';
import Link from 'next/link';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";

@inject('environmentStore', 'authStore')
@observer
class New extends React.Component {
    constructor(props) {
        super(props);
        const { environmentStore, authStore } = this.props;
        console.log(environmentStore, authStore);
    }

    render() {
        const { environmentStore, i18n } = this.props;

        return (
            <div>
                <Link href={`/?${environmentStore.queryString}`}><a>goto Home!.</a></Link>
                {i18n.t('login')}
            </div>
        );
    }
}

export default withTranslation()(New);