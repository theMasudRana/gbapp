<?php
/**
 * Plugin Name: GB App
 * Description: A plugin to check WordPress data store.
 * Version: 1.0.0
 * Author: Masud Rana
 *
 */

function gbapp_admin_menu() {
    add_menu_page(
        __( 'GB App', 'gutenberg' ),
        __( 'GB App', 'gutenberg' ),
        'manage_options',
        'gbapp',
        function () {
            echo '
            <h2>Pages</h2>
            <div id="gbapp"></div>
        ';
        },
        'dashicons-schedule',
        3
    );
}

add_action( 'admin_menu', 'gbapp_admin_menu' );

function gbapp_scripts( $hook ) {
    // Load only on ?page=toplevel_page_gbapp.
    if ( 'toplevel_page_gbapp' !== $hook ) {
        return;
    }

    // Load the required WordPress packages.

    // Automatically load imported dependencies and assets version.
    $asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

    // Enqueue CSS dependencies.
    foreach ( $asset_file['dependencies'] as $style ) {
        wp_enqueue_style( $style );
    }

    // Load our app.js.
    wp_register_script(
        'gbapp-script',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );
    wp_enqueue_script( 'gbapp-script' );

    // Load our style.css.
    wp_register_style(
        'gbapp-style',
        plugins_url( 'style.css', __FILE__ ),
        array(),
        $asset_file['version']
    );
    wp_enqueue_style( 'gbapp-style' );
}

add_action( 'admin_enqueue_scripts', 'gbapp_scripts' );
