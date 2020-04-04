import { registerBlockType } from '@wordpress/blocks';
import { SelectControl } from '@wordpress/components';
import ArticlesList from "./articlesList";

registerBlockType( 'block-list-post-type/block-list-post-type', {
	title: 'List Post Type',
	category: 'layout',
	edit: ({ attributes, setAttributes } ) => {
		const { selected, postTypes } = attributes;
		return (
			<div>
				<div style={{ maxWidth: "300px", margin: "0 auto"}}>
					<SelectControl
						label="Select a post type"
						value={selected}
						options={ 
							postTypes.map( postTypeName => ({
								label: postTypeName,
								value: postTypeName
							}))
						}
						onChange={ ( postTypeName ) => { 
							setAttributes({ selected: postTypeName } )
						} }
						/>
				</div>
				<ArticlesList type={ selected } />
			</div>
		) 
    },
	save: () => null
} );
