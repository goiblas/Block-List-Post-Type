import { Spinner } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

const ArticlesList = ({ articles }) => {
    if ( ! articles ) {
        return (
            <p style={{textAlign: "center", padding: "1rem"}}>
                <Spinner />
            </p>
        );
    }
    return (
        <ul>
            { articles.map( (article, index) => (
                    <li key={index}>
                        <a href={ article.link }>
                            { article.title.rendered }
                        </a>
                    </li>
                ))
            }
        </ul>
    );
}

export default withSelect( (select, props) => {
    return {
        articles : select( 'core' ).getEntityRecords( 'postType', props.type, { per_page: 6 } )
    }}
)(ArticlesList)