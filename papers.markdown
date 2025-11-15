---
layout: page
title: Paper Presentations
permalink: /papers/
---

<div class="home">
  <p>
  I read some papers, and sometimes I took notes to record what I have learned. I find that putting these insights into a brief, quick slideshow helps me revisit the main ideas later almost as a sort of personal mini-presentation. Here’s a collection of all the slides I’ve created. Feel free to explore and tell me if you have any feedback.
  </p><br>
  <ul class="posts">
    {% for slide in site.slides %}
      <li>
        <span class="post-date">{{ slide.date | date: "%b %-d, %Y" }}</span>
        <a class="post-link" href="{{ slide.url | prepend: site.baseurl }}">{{ slide.title }}</a>
        <br>
        {{ slide.biblio }}
      </li>
    {% endfor %}
  </ul>
</div>