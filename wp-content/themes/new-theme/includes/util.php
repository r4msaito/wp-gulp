<?php

function newtheme_send_json_resp($resp) {
    echo json_encode($resp);
    wp_die();
}


function newtheme_get_thumbnail_img($id, $size) {
    $attachment = wp_get_attachment_image_src(get_post_thumbnail_id($id), $size);

    if (!empty($attachment)) {
        return $attachment[0];
    } else {
        return null;
    }
}


function newtheme_limit_excerpt($limit) {
    $excerpt = explode(' ', get_the_excerpt(), $limit);
    if (count($excerpt) >= $limit) {
        array_pop($excerpt);
        $excerpt = implode(" ", $excerpt) . '...';
    } else {
        $excerpt = implode(" ", $excerpt);
    }
    $excerpt = preg_replace('`[[^]]*]`', '', $excerpt);
    return $excerpt;
}
