import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Select } from 'antd';

@inject('environment')
@observer
class SelectLanguage extends React.Component {
    changeLanguage = (language) => {
        const { environment } = this.props;
        environment.set('language', language);
    }

    render() {
        const { i18n, style } = this.props;

        return (
            <Select value={i18n.language} onChange={this.changeLanguage} style={style || {}}>
                <Select.Option value="ko">{i18n.t('korean')}</Select.Option>
                <Select.Option value="en">{i18n.t('english')}</Select.Option>
            </Select>
        );
    }
}

export default withTranslation('SelectLanguage')(SelectLanguage);