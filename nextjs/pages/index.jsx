import React from 'react';
import Link from 'next/link';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";

@inject('environmentStore')
@observer
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { environmentStore, i18n } = this.props;

        return (
            <div>
                <Link href={`/new${environmentStore.queryString}`}><a>goto New!.</a></Link>
                {i18n.t('login')}
            </div>
        );
    }
}

export default withTranslation()(Home);