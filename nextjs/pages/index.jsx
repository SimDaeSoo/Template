import React from 'react';
import { observer, inject } from 'mobx-react';
import Link from 'next/link';

@inject('testStore')
@observer
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    setString = () => {
        const { testStore } = this.props;
        testStore.fetch('I am home');
    }

    render() {
        const { testString } = this.props.testStore;
        return (
            <div>
                <Link href='/new'><a>goto New!.</a></Link>
                <button onClick={this.setString}>
                    setText
        </button>
                {testString}
            </div>
        );
    }
}

export default Home;