import { render } from '@wordpress/element';

function MyFirstApp() {
    const pages = [{ id: 'mock', title: 'Sample page' }]
    return <PagesList pages={ pages }/>;
}

function PagesList( { pages } ) {
    return (
        <ul>
            { pages?.map( page => (
                <li key={ page.id }>
                    { page.title }
                </li>
            ) ) }
        </ul>
    );
}

window.addEventListener(
	'load',
	function () {
		render(
			<MyFirstApp />,
			document.querySelector('#gbapp')
		);
	},
	false
);
