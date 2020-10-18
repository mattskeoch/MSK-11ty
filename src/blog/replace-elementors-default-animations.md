---
title: Replace Elementors Default Animations
date: "2020-02-02"
description: "Learn how to edit or replace Elementors default entrance animations."
tags:
  - Wordpress
  - Elementor
  - featured
---

Have you ever wanted to change or even completely change Elementor default entrance animations? Using a 


### Let's get started

First, we need to locate the default Elementor animations.min.css file. Using VSCode or whichever code editor you prefer navigate to the following directory /wp-content/plugins/elementor/assets/lib/animations and open the animations.min.css file. 
Since the file is minified you will need to format the code to make it readable.

Now you can edit the default animations however you like. I recommend starting with [Animista](https://animista.net/) whos animation library will give you a great starting point. Alternatively [Frank Tielemans has a great video over](https://www.youtube.com/watch?v=_aJCXVfnMco&fbcli) over on his youtube showing you his custom animations and even provides you with his CSS file to use which you can find [here](https://glyphbox.be/downloads/animations.min.css).

### Dequeue Elementors Animation File

Now that you have your new animations created the next thing we need to do is stop Elementors original animations.min.css from loading. To do this you need to dequeue the file by adding the following code to your child themes functions.php file. 

```php
function dequeue_animations_style() {
  wp_dequeue_style('elementor-animations');
  wp_deregister_style('elementor-animations');
}
add_action('wp_enqueue_scripts','dequeue_animations_style', 100);
```
Now that Elementors original animations.min.css file is no longer being loaded we need to tell WordPress to load our animations file in its place.

First, if you don't already have a CSS folder in your child theme go ahead and create one. Once you have done that move our new animations.css file into that folder. 

### Enqueue Your Custom Animation File

Add the following to our child themes functions.php to load our new animations.css file. 
```php
function enqueue_styles() {
    wp_enqueue_style( 'style', get_stylesheet_directory_uri() . '/css/animations.custom.css');
}
add_action( 'wp_enqueue_scripts', 'enqueue_styles');
```

And that's it! You are now loading your brand new animations.css file onto your site in place of the original. 



