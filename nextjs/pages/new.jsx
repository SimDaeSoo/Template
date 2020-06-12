import React from 'react';
import { observer, inject } from 'mobx-react';
import Link from 'next/link';

@inject('testStore')
@observer
class New extends React.Component {
    constructor(props) {
        super(props);
    }

    setString = () => {
        const { testStore } = this.props;
        testStore.fetch('I am New');
    }

    render() {
        const { testString } = this.props.testStore;
        return (
            <div>
                <Link href='/'><a>goto Home!.</a></Link>
                <button onClick={this.setString}>
                    setText
                </button>
                {testString}
            </div>
        );
    }
}

export default New;