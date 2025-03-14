import { SearchControl, Spinner } from '@wordpress/components';
import { useState, render } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';

function MyFirstApp() {
	const [searchTerm, setSearchTerm] = useState('');
	const { pages, hasResolved } = useSelect(
		(select) => {
			const query = {};
			if (searchTerm) {
				query.search = searchTerm;
			}
			const selectorArgs = ['postType', 'page', query];
			return {
				pages: select(coreDataStore).getEntityRecords(...selectorArgs),
				hasResolved: select(coreDataStore).hasFinishedResolution(
					'getEntityRecords',
					selectorArgs
				),
			};
		},
		[searchTerm]
	);

	return (
		<div>
			<SearchControl onChange={setSearchTerm} value={searchTerm} />
			<PagesList hasResolved={hasResolved} pages={pages} />
		</div>
	);
}

function PagesList({ hasResolved, pages }) {
	if (!hasResolved) {
		return <Spinner />;
	}
	if (!pages?.length) {
		return <div>No result</div>;
	}
	return (
		<>
			<table className="wp-list-table widefat fixed striped table-view-list">
				<thead>
					<tr>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>
					{pages?.map((page) => (
						<tr key={page.id}>
							<td>{decodeEntities(page.title.rendered)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

window.addEventListener(
	'load',
	function () {
		render(<MyFirstApp />, document.querySelector('#gbapp'));
	},
	false
);
