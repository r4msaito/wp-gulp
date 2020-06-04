<?php

function newtheme_enqueue_scripts() {
    wp_enqueue_script(ENQ_HANDLE . 'vendor-js', TDU . '/assets/js/dist/vendor.js', [], '1.0.0', true);
    wp_enqueue_script(ENQ_HANDLE . 'main-js', TDU . '/assets/js/dist/main.js', [], '1.0.0', true);
}

function newtheme_enqueue_styles() {
    wp_enqueue_style(ENQ_HANDLE . 'style', get_stylesheet_uri());
    wp_enqueue_style(ENQ_HANDLE . 'vendor-css', TDU . '/assets/style/dist/vendor.css');
    wp_enqueue_style(ENQ_HANDLE . 'main-css', TDU . '/assets/style/dist/main.css');
}

add_action('wp_enqueue_scripts', 'newtheme_enqueue_scripts');
add_action('wp_enqueue_scripts', 'newtheme_enqueue_styles');
