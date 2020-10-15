---
title: Use if expression to apply data attribute
description: "Conditionally apply a data attribute using Nunjucks if expression."
date: 2020-09-01
tags:
  - 11ty
  - NJK
  - featured
key: post
---




### content is here 

```js
<div class="hero" %if page.url === "/" %} data-animated="true" % endif %}></div>
```

need to wrap if statement open and close with %
