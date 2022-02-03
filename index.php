<?php get_header(); ?>
<?php
if(!is_woocommerce()&&!is_product()&&!is_cart()&&!is_checkout()&&!is_account_page()):
?>
<div id='root'></div>
<?php else: ?>
<div id="react-header"></div>
<div class="flex">
  <div id="react-sidemenu"></div>
    <div class="relative flex-grow z-10 pt-14 lg:pt-24 lg:ml-24 overflow-hidden">

    <?php
    if ( have_posts() ) {
    	// Load posts loop.
    	while ( have_posts() ) {
    		the_post();
        echo '<div class="px-8 py-10 lg:p-24 woocommerce-content">';
        the_content();
        echo '</div>';
    	}
    }
    ?>
    <div id="react-footer"></div>
  </div>
</div>
<?php endif; ?>
<?php get_footer(); ?>
