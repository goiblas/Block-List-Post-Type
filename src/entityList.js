import { Spinner } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

const EntityList = ({ entities }) => {
    if ( ! entities ) {
        return (
            <p style={{textAlign: "center", padding: "1rem"}}>
                <Spinner />
            </p>
        );
    }
    return (
        <ul>
            { entities.map( (entity, index) => (
                    <li key={index}>
                        <a href={ entity.link }>
                            { entity.title.rendered }
                        </a>
                    </li>
                ))
            }
        </ul>
    );
}

export default withSelect( (select, props) => {
    return {
        entities : select( 'core' ).getEntityRecords( 'postType', props.entity, { per_page: 6 } )
    }}
)(EntityList)