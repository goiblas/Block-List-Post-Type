<?php
/**
 * @author      Jesús Olazagoitia (@goiblas)
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: Block List Post Type
 * Version:     1.0.0
 * Author:      Jesús Olazagoitia
 * Author URI:  https://goiblas.com
 * License:     GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

defined('ABSPATH') || exit;

/**
 * Register block
 */
function block_list_post_type_register_block() {
	wp_register_script(
		'block_list_post_type_scripts',
		plugins_url( 'build/index.js', __FILE__ ),
		array("wp-blocks","wp-components","wp-data","wp-element","wp-polyfill"),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js')
	);

	$args = array(
		'public' => true
	);
	$postTypes = get_post_types($args, 'names');
	unset($postTypes['attachment']);

	register_block_type( 'block-list-post-type/block-list-post-type', array(
		'editor_script' => 'block_list_post_type_scripts',
		'render_callback' =>  'block_list_post_type_render',
		'attributes' => [
			'selected' => [
				'type' => 'string', 
				'default' => 'post'
			],
			'postTypes'  => [
				'type'  => 'array',
				'default' => array_keys($postTypes)
			]
		]
	 ) );
}

add_action( 'init', 'block_list_post_type_register_block', 1 );

/**
 * Render block in frontend
 */
function block_list_post_type_render($attributes) {
	$args = array(
		'post_type'   => $attributes['selected'],
		'posts_per_page' => 6,
		'post_status' => 'publish',
	);
	$entity = new WP_Query( $args );

	$entityList = '';
	while( $entity->have_posts() ) :$entity->the_post();
		$entityList .= '<li><a href='. get_permalink().'>'. get_the_title() .'</a></li>';
	endwhile;
	wp_reset_postdata();

	return  '</ul>'. $entityList . '</ul>';
}
