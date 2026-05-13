---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
title: Blog
permalink: /blog/
---

<div class="home">
  <div class="search-wrapper">
		<div class="search-box">
			<i class="fab fa-magnify"></i>
			<input type="text" id="search" placeholder="Search posts..." oninput="filter(this.value)"/>
			<button class="clear-btn" id="clear-btn" onclick="clearSearch()" aria-label="Clear search">&#x2715;</button>
		</div>
  </div>
  <ul class="posts">
    {% for post in site.posts %}
      <li>
        <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        <br>
        {{ post.description | default: post.excerpt | strip_html | truncate: 150 }}
      </li>
    {% endfor %}
  </ul>
  <p class="no-results" id="no-results" style="display:none;">No posts found.</p>
</div>

<script src="/js/search.js"></script>