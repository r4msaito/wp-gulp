<?php

/*
 * Hide Admin Bar
 */

add_action("after_setup_theme", function () {
    add_theme_support("automatic-feed-links");
    add_theme_support("title-tag");
    add_theme_support("post-thumbnails");
    register_nav_menus(array(
        "primary" => "Main Nav",
        "secondary_menu" => "Info Nav",
    ));

    add_theme_support("html5", array(
        "search-form",
        "comment-form",
        "comment-list",
        "gallery",
        "caption",
        "gallery",
    ));
});

add_filter("show_admin_bar", function () {
    return false;
});

function remove_dashboard_widgets() {
    global $wp_meta_boxes;
    unset($wp_meta_boxes["dashboard"]["normal"]);
    unset($wp_meta_boxes["dashboard"]["side"]);
}

add_action("wp_dashboard_setup", "remove_dashboard_widgets");

/*
 * Admin page css
 */

function newtheme_remove_wp_thank_you() {
    ?>
    <style>
        #footer-thankyou {
            display: none;
        }
    </style>
<?php
}

add_action("admin_head", "newtheme_remove_wp_thank_you");
